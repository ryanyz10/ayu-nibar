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

const get_color = (unit, temp) => {
    switch (unit) {
        case "f": return (temp >= 86 ? styles.colors.red : (temp <= 46.4 ? styles.colors.accent : null));
        case "c": return (temp >= 30 ? styles.colors.red : (temp <= 8 ? styles.colors.accent : null));
        default: return (temp >= 303.15 ? styles.colors.red : (temp <= 281.15 ? styles.colors.accent : null));
    }
}

export const render = ({ output }) => {
    if (output === "Error") {
        return null;
    }
    let [code, icon, temp, unit] = output.split("|");
    code = Number(code);
    let day = icon == 'd';
    let condition = get_conditions(code, day);

    return (
        <div style= {{color: get_color(unit, temp) }}>
        {condition} {temp}
        </div>
    );
};

export default render;
