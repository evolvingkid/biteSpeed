import classes from "./style.module.css";

const TextArea = ({ name, onChange, value }) => {
  return (
    <div className={`flex flex-col gap-1`}>
      <label htmlFor={name} className="text-sm text-grey">
        Text
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
