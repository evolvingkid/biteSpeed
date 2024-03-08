import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MarkerType,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useOnSelectionChange,
} from "reactflow";
import { FlowDataPreserveContext } from "../../../context/flowDataPreserve.context";

const generateRandomNumber = (min = 1, max = 10000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getId = () => `${generateRandomNumber()}`;

const connectedStyle = {
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
};

export const useBuilder = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const navigate = useNavigate();
  const { reactFlowInstance } = useContext(FlowDataPreserveContext);

  //*  flow  updates / changes controllers
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
      return addEdge({ ...params, ...connectedStyle }, eds);
    });
  }, []);

  //   this  handle if the node is selected or not and if needed to show settings panel
  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length) {
        navigate(`${nodes[0]?.id}/setting`);
      } else {
        navigate("/");
      }
    },
  });

  //*  node adding controllers
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // getting this data from the node
      // nodeTile.jsx >> onDragStart method
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

  //? edge validations
  const isValidConnection = useCallback(
    (connection) => {
      //  check is the connecting source is already connected with another target
      const connectedSource =
        edges.filter((e) => e.source === connection.source) || [];

      if (connectedSource.length) {
        return false;
      }

      return true;
    },
    [edges]
  );

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    isValidConnection,
  };
};
