import TextMessageEdit from "../Edit/TextMessageEdit";
import { TextMessageNodeTile } from "../NodePanel/components/nodeTile";
import TextMessageNode from "./components/textMessage";

//* config for node types
// flowChartUI means the UI card that will show inside react-flow
// nodeUI means the UI card that will show in node panel
//  editForm means that form that will will be shown in the setting panel
export const flowNodeConfig = {
  textMessageNode: {
    flowChartUI: TextMessageNode,
    type: "textMessageNode",
    nodeUI: <TextMessageNodeTile />,
    editForm: (initialValue, onChange) => (
      <TextMessageEdit initialValue={initialValue} onChange={onChange} />
    ),
  },
};

export const getNodeTypeList = () => {
  const nodeTypes = {};

  for (const key in flowNodeConfig) {
    nodeTypes[key] = flowNodeConfig[key].flowChartUI;
  }

  return nodeTypes;
};

export const getNodeList = () => {
  const nodes = [];

  for (const key in flowNodeConfig) {
    nodes.push(flowNodeConfig[key]);
  }

  return nodes;
};
