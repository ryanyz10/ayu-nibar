import DateTime from "./lib/DateTime.jsx";
import Battery from "./lib/Battery.jsx";
import Cpu from "./lib/Cpu.jsx";
import Wifi from "./lib/Wifi.jsx";
import Dnd from "./lib/Dnd.jsx";
import Error from "./lib/Error.jsx";
import Spotify from "./lib/Spotify.jsx";
import parse from "./lib/parse.jsx";
import styles from "./lib/styles.jsx";

const style = {
    display: "grid",
    padding: "0 12px",
    gridAutoFlow: "column",
    gridGap: "20px",
    position: "fixed",
    overflow: "hidden",
    right: "0px",
    top: "0px",
    color: styles.colors.dim,
    fontFamily: styles.fontFamily,
    fontSize: styles.fontSize,
    lineHeight: styles.lineHeight,
    fontWeight: styles.fontWeight
};

const clock_style = {
    display: "grid",
    padding: "0 12px",
    gridAutoFlow: "column",
    gridGap: "20px",
    position: "fixed",
    overflow: "hidden",
    right: "calc(50% - 100px)",
    top: "0px",
    color: styles.colors.dim,
    fontFamily: styles.fontFamily,
    fontSize: styles.fontSize,
    lineHeight: styles.lineHeight,
    fontWeight: styles.fontWeight,
    textAlign: "center"
};

export const refreshFrequency = 10000;

export const command = "./ayu-nibar/scripts/status.sh";

export const render = ({ output }) => {
    const data = parse(output);
    if (typeof data === "undefined") {
        return (
            <div style={style}>
            <Error msg="Error: unknown script output" side="right" />
            </div>
        );
    }
    return (
        <div>
        <div style={clock_style}>
        <DateTime output={data.datetime} />
        </div>

        <div style={style}>
        <Cpu output={data.cpu} />
        <Wifi output={data.wifi} />
        <Battery output={data.battery} />
        <Spotify output={data.spotify} />
        <Dnd output={data.dnd} />
        </div>
        </div>
    );
};

export default null;
