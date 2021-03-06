import styles from "./styles.jsx";

String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

const parse_name = (name, artist) => {
    let regex = new RegExp('[,:()-]');

    let index = name.regexIndexOf(regex); 
    if (index > 0) {
        let sub = name.substring(0, index).trim();
        if (artist.includes(sub)) {
            name = name.substring(index + 1);
            index = name.regexIndexOf(regex);
            sub = name.substring(0, index);
        }

        return sub;
    }

    return name;
}

const render = ({ output }) => {
    let status = output.status;
    if (status == 'stopped' || status == '') {
        return null;
    }

    let artist = output.artist
    let name = parse_name(output.name, artist);
    let airplay = (artist == '' && name == '')

    if (airplay) {
        return null
    }

    let paused = (status == 'paused')


    return (
        <div>
        <span>{paused ? "􀊆" : "􀊄"} {artist} - {name}</span>
        </div>
    );
};

export default render;
