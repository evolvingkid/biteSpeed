import { Fragment } from "react";
import { BackArrow } from "../../../assets/icons";
import IconButton from "../../../components/button/iconBtn";
import classes from "./style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useNodes, useReactFlow } from "reactflow";
import { flowNodeConfig } from "../Builder/config";
import { useRouteValidation } from "./hooks";

const Edit = () => {
  const navigate = useNavigate();
  const node = useNodes();
  const params = useParams();
  const reactFlow = useReactFlow();

  useRouteValidation();

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
      return node.map((e) => (e?.selected ? { ...e, data: val } : { ...e }));
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

      {renderEditForm(node, params, onFormValueChange)}
    </Fragment>
  );
};

export default Edit;

const renderEditForm = (node, params, onFormValueChange) => {
  if (!node?.length || !params?.nodeId) {
    return null;
  }

  const selectedNode = getSelectedNode(node);

  console.log();

  if (!selectedNode?.length) {
    return null;
  }

  if (!flowNodeConfig[selectedNode[0].type]?.editForm) {
    return null;
  }

  return (
    <div key={selectedNode[0]?.id}>
      {flowNodeConfig[selectedNode[0].type]?.editForm(
        getCurrentNodeData(node),
        onFormValueChange
      )}
    </div>
  );
};

const getSelectedNode = (node) => {
  const selectedNode = node.filter((e) => e?.selected) || [];

  return selectedNode;
};

const getCurrentNodeData = (node) => {
  const selectedNode = node.filter((e) => e?.selected) || [];

  if (selectedNode?.length) {
    return { ...selectedNode[0]?.data };
  }

  return {};
};
