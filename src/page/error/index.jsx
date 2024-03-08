const ErrorPage = ({ message }) => {
  return <div className="flex items-center justify-center h-full">{message || "Not Found"}</div>;
};

export default ErrorPage;
