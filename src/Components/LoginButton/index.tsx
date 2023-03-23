import { LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const LoginButotn = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/login");
  };
  return (
    <Button
      style={{ backgroundColor: "#DAA520" }}
      onClick={handleLogOut}
      icon={<LoginOutlined />}
      type="primary"
    >
      Log In
    </Button>
  );
};

export default LoginButotn;
