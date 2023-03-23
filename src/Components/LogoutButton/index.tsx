import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    Cookies.remove("auth_token");
    Cookies.remove("username");
    navigate("/");
    window.location.reload();
  };
  return (
    <Button
      style={{ backgroundColor: "#DAA520" }}
      onClick={handleLogOut}
      icon={<LogoutOutlined />}
      type="primary"
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
