import PropTypes from 'prop-types';
import classes from './style.module.css'

const Button = ({children}) => {
  return <button className={classes.button}>{children}</button>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
