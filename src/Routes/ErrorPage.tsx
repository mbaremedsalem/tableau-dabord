import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function ErrorPage({ status = "error", message = "Something went wrong" }) {
  const navigate = useNavigate();

  return (
    <Result
      status={status === "404" ? "404" : status === "403" ? "403" : "error"}
      title={status === "404" ? "404" : status === "403" ? "403" : "Error"}
      subTitle={status === "404" ? "Sorry, the page you visited does not exist." :
                status === "403" ? "Sorry, you are not authorized to access this page." :
                message}
      extra={<Button onClick={() => navigate("/login")}>Back Home</Button>}
    />
  );
}

export default ErrorPage;
