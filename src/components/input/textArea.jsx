import classes from "./style.module.css";

const TextArea = ({ name, onChange, value, label }) => {
  return (
    <div className={`flex flex-col gap-1`}>
      <label htmlFor={name} className="text-sm text-grey">
        {label}
      </label>
      <textarea
        className={classes.textarea}
        value={value}
        onChange={onChange}
        name={name}
        rows={3}
      />
    </div>
  );
};

export default TextArea;
