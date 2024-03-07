import Nav from "../../components/nav";
import Builder from "./Builder";
import NodePanel from "./NodePanel";
import classes from "./style.module.css";

const HomePage = () => {
  return (
    <div className={`${classes.parent_container}`}>
      <Nav />
      <section className={classes.content}>
        <section>
          <Builder />
        </section>

        <section className={classes?.side_bar}>
          <NodePanel />
        </section>
      </section>
    </div>
  );
};

export default HomePage;
