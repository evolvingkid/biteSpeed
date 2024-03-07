import { Outlet } from "react-router-dom";
import Nav from "../../components/nav";
import Builder from "./Builder";
import classes from "./style.module.css";
import Button from "../../components/button";

const HomePage = () => {
  return (
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
  );
};

export default HomePage;

const Navbar = () => {
  return <Nav extra={<Button>Save Changes</Button>} />;
};
