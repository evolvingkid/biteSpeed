import classes from "./style.module.css";

const IconButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={classes.icon_button}>
      {children}
    </button>
  );
};

export default IconButton;
