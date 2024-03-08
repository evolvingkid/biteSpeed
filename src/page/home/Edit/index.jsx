import { Fragment } from "react";
import { BackArrow } from "../../../assets/icons";
import IconButton from "../../../components/button/iconBtn";
import classes from "./style.module.css";
import TextMessageEdit from "./TextMessageEdit";
import { useNavigate, useParams } from "react-router-dom";
import { useNodes, useReactFlow } from "reactflow";

const Edit = () => {
  const navigate = useNavigate();
  const node = useNodes();
  const params = useParams();

  const reactFlow = useReactFlow();

  const handleBack = () => {
    reactFlow.setNodes((node) => {
      return node.map((e) =>
        e?.id === params?.nodeId ? { ...e, selected: false } : { ...e }
      );
    });

    navigate("/");
  };

  const onFormValueChange = (val) => {
    reactFlow.setNodes((node) => {
      return node.map((e) =>
        e?.id === params?.nodeId ? { ...e, data: val } : { ...e }
      );
    });
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

      {node?.length && params?.nodeId ? (
        <TextMessageEdit
          initialValue={getCurrentNodeData(node, params?.nodeId)}
          onChange={onFormValueChange}
        />
      ) : null}
    </Fragment>
  );
};

export default Edit;

const getCurrentNodeData = (node, currentId) => {
  const selectedNode = node.filter((e) => e?.id === currentId) || [];

  if (selectedNode?.length) {
    return { ...selectedNode[0]?.data };
  }

  return {};
};
