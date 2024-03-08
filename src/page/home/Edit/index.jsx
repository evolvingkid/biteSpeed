import { Fragment } from "react";
import { BackArrow } from "../../../assets/icons";
import IconButton from "../../../components/button/iconBtn";
import classes from "./style.module.css";
import TextMessageEdit from "./TextMessageEdit";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    console.log('sadsadsa');
    navigate(-1);
  };

  return (
    <Fragment>
      <div className={`flex flex-1 items-center py-1 ${classes.title_card}`}>
        <IconButton onClick={handleBack}>
          <BackArrow height="17" width="17" fill="#737373ff" />
        </IconButton>

        <div className="flex flex-1 items-center justify-center">
          <span className={`text-base ${classes.title}`}>Message</span>
        </div>
      </div>

      <TextMessageEdit />
    </Fragment>
  );
};

export default Edit;
