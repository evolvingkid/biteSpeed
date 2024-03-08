import { Chat } from "../../../../assets/icons";
import classes from "./style.module.css";

const NodeTile = ({ children, nodeType }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div onDragStart={onDragStart} draggable>
      {children}
    </div>
  );
};

export default NodeTile;

// UI card of text message node
export const TextMessageNodeTile = () => {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-1 ${classes.node_tile} cursor-pointer`}
    >
      <Chat fill="#7282edff" />
      <span className="text-base text-primary">Message</span>
    </div>
  );
};
