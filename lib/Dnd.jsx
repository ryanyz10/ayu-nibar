import styles from "./styles.jsx";

const style = {
  color: styles.colors.red
}

const render = ({ output }) => {
  if (output === 0) return null;
  return <div style={style}>􀆾</div>;
};

export default render;
