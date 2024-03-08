import { useEffect, useState } from "react";
import TextArea from "../../../../components/input/textArea";

const TextMessageEdit = ({ initialValue, onChange }) => {
  const [formValue, setFormValue] = useState({
    textMessage: "",
    ...initialValue,
  });

  useEffect(() => {
    if (onChange) {
      onChange(formValue);
    }
  }, [formValue]);

  const onValueChange = (value, formKey) => {
    setFormValue((pre) => ({...pre, [formKey]: value}));
  };

  return (
    <div className="px-2 py-4 pt-6">
      <TextArea
        name={"text_message"}
        onChange={(e) => onValueChange(e.target.value, "textMessage")}
        value={formValue["textMessage"]}
      />
    </div>
  );
};

export default TextMessageEdit;
