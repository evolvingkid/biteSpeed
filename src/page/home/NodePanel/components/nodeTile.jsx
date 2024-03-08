import { Chat } from "../../../../assets/icons";
import classes from "./style.module.css";

const NodeTile = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`flex flex-col justify-center items-center gap-1 ${classes.node_tile} cursor-pointer`}
      onDragStart={(event) => onDragStart(event, "textMessageNode")}
      draggable
    >
      <Chat fill="#7282edff" />
      <span className="text-base text-primary">Message</span>
    </div>
  );
};

export default NodeTile;
