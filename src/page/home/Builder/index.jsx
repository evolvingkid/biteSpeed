import ReactFlow, {
  MarkerType,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import TextMessageNode from "./components/textMessage";
import { useCallback, useRef, useState } from "react";
import "./style.css";

const initialNodes = [
  {
    id: "1",
    type: "textMessageNode",
    position: { x: 0, y: 100 },
    data: { textMessage: "text Message 1" },
  },
  {
    id: "2",
    type: "textMessageNode",
    position: { x: 400, y: 0 },
    data: { textMessage: "text Message 2" },
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 10,
      height: 10,
      color: "#b8b8b8ff",
    },
    style: {
      strokeWidth: 2,
      stroke: "#b8b8b8ff",
    },
  },
];

const nodeTypes = {
  textMessageNode: TextMessageNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const Builder = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const reactFlowWrapper = useRef(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params) => {
    setEdges((eds) => {
      return addEdge(
        {
          ...params,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 10,
            height: 10,
            color: "#b8b8b8ff",
          },
          style: {
            strokeWidth: 2,
            stroke: "#b8b8b8ff",
          },
        },
        eds
      );
    });
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const isValidConnection = useCallback(
    (connection) => {
      const connectedSource =
        edges.filter((e) => e.source === connection.source) || [];

      console.log(connectedSource);

      if (connectedSource.length) {
        return false;
      }

      return true;
    },
    [edges]
  );

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
