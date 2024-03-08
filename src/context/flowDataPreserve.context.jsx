import { createContext, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useReactFlow } from "reactflow";

export const FlowDataPreserveContext = createContext();
const localStorageKey = "chat-flow";

const FlowDataPreserveProvider = ({ children }) => {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlow = useReactFlow();
  const [isInitialed, setIsInitialed] = useState(false);

  // init the data when loaded
  useEffect(() => {
    if (!isInitialed) {
      getData();
      setIsInitialed(true);
    }
  }, [isInitialed]);

  //  save the data to local storage
  const saveData = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          ...flow,
          nodes: flow.nodes?.map((e) => ({ ...e, selected: false })),
        })
      );
      toast.success("Flow saved");
    }
  }, [reactFlowInstance]);

  //  get the data from local storage
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
      value={{
        getData,
        saveData,
        setReactFlowInstance,
        reactFlowInstance,
        isInitialed,
      }}
    >
      {children}
    </FlowDataPreserveContext.Provider>
  );
};

export default FlowDataPreserveProvider;
