import classes from "./style.module.css";
import PropTypes from "prop-types";

const Nav = ({ extra }) => {
  return (
    <nav className={`${classes?.nav} py-2 bg-secondary grid grid-cols-12 `}>
      <div className="col-span-9 px-2"></div>

      <div className="col-span-3 flex items-center justify-center px-2">
        {extra}
      </div>
    </nav>
  );
};

Nav.propTypes = {
  extra: PropTypes.node,
};

export default Nav;
