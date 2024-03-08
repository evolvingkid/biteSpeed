import { useContext, useEffect } from "react";
import { FlowDataPreserveContext } from "../../../context/flowDataPreserve.context";
import { useNavigate, useParams } from "react-router";
import { useNodes } from "reactflow";

export const useRouteValidation = () => {
  const { isInitialed, reactFlowInstance } = useContext(
    FlowDataPreserveContext
  );
  const navigate = useNavigate();
  const node = useNodes();
  const params = useParams();

  const checkingValidNode = () => {
    const selectedNode = node.filter((e) => e?.selected);

    if (!selectedNode.length) {
      navigate("/");
    } 
  };

  useEffect(() => {
    if (isInitialed && node.length && params?.nodeId) {
      checkingValidNode();
    }
  }, [isInitialed, node, params, reactFlowInstance]);
};
