import styles from "./styles.jsx";

const get_conditions = (code, day) => {
    let cond = Math.floor(code / 100);

    switch (cond) {
        case 2: return "􀇟";
        case 3: return "􀇅";
        case 5: return "􀇇";
        case 6: return "􀇏";
        case 7: {
            switch (code) {
                case 711: return "􀇣";    
                case 721: return "􀆸";
                case 731: return "􀆶";
                case 741: return "􀇋";
                case 781: return "􀇧";
                default: return "􀇋";
            }
        }
        case 8: {
            switch (code) {
                case 800: return day ? "􀆮" : "􀆺";
                default: return "􀇃";
            }
        }
        default: return day ? "􀆮" : "􀆺";
    }
}

export const render = ({ output }) => {
    let [code, icon, temp] = output.split("|");
    code = Number(code);
    let day = icon == 'd';
    let condition = get_conditions(code, day);

    return (
        <div>
        {condition} {temp}
        </div>
    );
};

export default render;
