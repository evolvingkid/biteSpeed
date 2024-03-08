import PropTypes from 'prop-types';
import classes from './style.module.css'

const Button = ({children, onClick}) => {
  return <button onClick={onClick} className={classes.button}>{children}</button>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
