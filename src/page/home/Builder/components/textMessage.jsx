import { Handle, Position } from "reactflow";
import { Chat, Whatsapp } from "../../../../assets/icons";
import classes from "./style.module.css";

const TextMessageNode = ({ data, isConnectable, id, selected }) => {
  return (
    <div className={`${classes?.tile} ${selected ? classes?.selected : ""}`}>
      <Handle
        type="target"
        id="connecter"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <div
        className={`bg-lightGreen flex items-center ${classes.upper_tile}  px-3 py-1 `}
      >
        <div className="flex items-center gap-2 flex-1">
          <Chat fill="#2f6158ff" height="13px" width="13px" />{" "}
          <span className="text-sm font-semibold">Send Message</span>
        </div>
        <div>
          <div
            className={`${classes.extras_tile} flex items-center justify-center`}
          >
            <Whatsapp height="15px" width="15px" />
          </div>
        </div>
      </div>
      <div className="p-3">
        <span className="text-sm">{data?.textMessage}</span>
      </div>

      <Handle
        type="source"
        id="sender"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default TextMessageNode;
