import { Fragment } from "react";
import useWindowDimensions from "../../utils";

const RestrictedResolution = ({children}) => {
  const { width } = useWindowDimensions();

  if (width <= 850) {
    return <div className="h-full flex items-center justify-center">Please use Desktop or laptop</div>
  }

  return <Fragment>{children}</Fragment>;
};

export default RestrictedResolution;
