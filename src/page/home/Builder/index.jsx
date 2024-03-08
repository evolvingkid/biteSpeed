import ReactFlow, {
  MarkerType,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useOnSelectionChange,
} from "reactflow";
import "reactflow/dist/style.css";
import TextMessageNode from "./components/textMessage";
import { useCallback, useRef, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const nodeTypes = {
  textMessageNode: TextMessageNode,
};

const generateRandomNumber = (min = 1, max = 10000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getId = () => `${generateRandomNumber()}`;

const Builder = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const navigate = useNavigate();
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
    [reactFlowInstance, nodes]
  );

  const isValidConnection = useCallback(
    (connection) => {
      const connectedSource =
        edges.filter((e) => e.source === connection.source) || [];

      if (connectedSource.length) {
        return false;
      }

      return true;
    },
    [edges]
  );

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length) {
        navigate(`${nodes[0]?.id}/edit`);
      } else {
        navigate("/");
      }
    },
  });

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
