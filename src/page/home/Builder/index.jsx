import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { useContext, useRef } from "react";
import "./style.css";
import { useBuilder } from "./hooks";
import { getNodeTypeList } from "./config";
import { FlowDataPreserveContext } from "../../../context/flowDataPreserve.context";

const nodeTypes = getNodeTypeList();

const Builder = () => {
  const reactFlowWrapper = useRef(null);
  const { setReactFlowInstance } = useContext(FlowDataPreserveContext);

  const {
    edges,
    isValidConnection,
    nodes,
    onConnect,
    onDragOver,
    onDrop,
    onEdgesChange,
    onNodesChange,
  } = useBuilder();

  return (
    <div ref={reactFlowWrapper} className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={setReactFlowInstance}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        isValidConnection={isValidConnection}
        className="chatbot-flow"
      />
    </div>
  );
};

export default Builder;
