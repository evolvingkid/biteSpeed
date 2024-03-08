import { Outlet } from "react-router-dom";
import Nav from "../../components/nav";
import Builder from "./Builder";
import classes from "./style.module.css";
import Button from "../../components/button";
import { ReactFlowProvider, useEdges, useNodes } from "reactflow";
import FlowDataPreserveProvider, {
  FlowDataPreserveContext,
} from "../../context/flowDataPreserve.context";
import { useContext } from "react";
import toast from "react-hot-toast";

const HomePage = () => {
  return (
    <ReactFlowProvider>
      <FlowDataPreserveProvider>
        <div className={`${classes.parent_container}`}>
          <Navbar />

          <div className="grid grid-cols-12 overflow-hidden">
            <section className="col-span-9">
              <Builder />
            </section>

            {/* Side bar of content and will be managed through routes */}
            <section className={`overflow-auto col-span-3 ${classes.side_bar}`}>
              <FlowDataPreserveContext.Consumer>
                {(ctx) => (ctx?.isInitialed && ctx?.reactFlowInstance ? <Outlet /> : null)}
              </FlowDataPreserveContext.Consumer>
            </section>
          </div>
        </div>
      </FlowDataPreserveProvider>
    </ReactFlowProvider>
  );
};

export default HomePage;

const Navbar = () => {
  const nodes = useNodes();
  const edges = useEdges();
  const { saveData } = useContext(FlowDataPreserveContext);

  const onSaveClicked = () => {
    console.log(validateNodeWithoutTarget(nodes, edges));
    if (!validateNodeWithoutTarget(nodes, edges)) {
      toast("Cannot save Flow");
      return;
    }

    saveData();
  };

  return <Nav extra={<Button onClick={onSaveClicked}>Save Changes</Button>} />;
};

const validateNodeWithoutTarget = (nodes, edges) => {
  nodes.sort((a, b) => a.id.localeCompare(b.id));
  edges.sort((a, b) => a.target.localeCompare(b.target));

  // node and edges will sorted by id and target

  let nodeWithoutTargetCount = 0;

  // checking array with node(id)[index] === edge(target)[index]
  // if the value is not same of both array then that means edge(target) don't have the node(id)[index]. (this is because both are sorted)
  // then will check next index of node(id) but the edge(target) index will not change.

  for (
    let nodeIndex = 0, edgesIndex = 0;
    nodeIndex < nodes.length;
    nodeIndex++
  ) {
    if (nodes[nodeIndex]?.id === edges[edgesIndex]?.target) {
      edgesIndex++;
    } else {
      nodeWithoutTargetCount++;
    }

    // finish the validation as early as possible.
    if (nodeWithoutTargetCount > 1) {
      return false;
    }
  }

  return nodeWithoutTargetCount <= 1;
};
