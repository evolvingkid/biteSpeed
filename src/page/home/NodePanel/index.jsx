import { getNodeList } from "../Builder/config";
import NodeTile from "./components/nodeTile";

const NodePanel = () => {
  const nodeList = getNodeList();

  return (
    <div className="grid grid-cols-2 p-3 gap-2">
      {nodeList.map((e, index) => (
        <NodeTile key={`node-list-${index}`} nodeType={e?.type}>{e.nodeUI}</NodeTile>
      ))}
    </div>
  );
};

export default NodePanel;
