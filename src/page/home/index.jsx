import { Outlet } from "react-router-dom";
import Nav from "../../components/nav";
import Builder from "./Builder";
import classes from "./style.module.css";
import Button from "../../components/button";
import { ReactFlowProvider, useEdges, useNodes } from "reactflow";

const HomePage = () => {
  return (
    <ReactFlowProvider>
      <div className={`${classes.parent_container}`}>
        <Navbar />

        <div className="grid grid-cols-12 overflow-hidden">
          <section className="col-span-9">
            <Builder />
          </section>

          {/* Side bar of content and will be managed through routes */}
          <section className={`overflow-auto col-span-3 ${classes.side_bar}`}>
            <Outlet />
          </section>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default HomePage;

const Navbar = () => {
  const nodes = useNodes();
  const edges = useEdges();

  const onSaveClicked = () => {

  
    nodes.sort((a, b) => a.id.localeCompare(b.id));
    edges.sort((a, b) => a.target.localeCompare(b.target));

    let nodeWithoutTargetCount = 0;

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
    }

    console.log(nodeWithoutTargetCount);
  };

  return <Nav extra={<Button onClick={onSaveClicked}>Save Changes</Button>} />;
};
