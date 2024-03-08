import { createContext, useCallback, useEffect, useState } from "react";
import { useReactFlow } from "reactflow";

export const FlowDataPreserveContext = createContext();
const localStorageKey = "chat-flow";

const FlowDataPreserveProvider = ({ children }) => {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlow = useReactFlow();
  const [isInitialed, setIsInitialed] = useState(false);

  useEffect(() => {
    if (!isInitialed) {
      getData();
      setIsInitialed(true);
    }
  }, [isInitialed]);

  const saveData = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(localStorageKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const getData = () => {
    const flow = JSON.parse(localStorage.getItem(localStorageKey));

    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;

      reactFlow.setNodes(flow.nodes || []);
      reactFlow.setEdges(flow.edges || []);
      reactFlow.setViewport({ x, y, zoom });
    }
  };

  return (
    <FlowDataPreserveContext.Provider
      value={{ getData, saveData, setReactFlowInstance, reactFlowInstance, isInitialed }}
    >
      {children}
    </FlowDataPreserveContext.Provider>
  );
};

export default FlowDataPreserveProvider;
