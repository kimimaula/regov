import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface UserAvatarProps {
  url: string;
}

const UserAvatar = ({ url }: UserAvatarProps) => {
  return (
    <Avatar
      style={{ border: "1px solid var(--clr-grey-primary)" }}
      size={100}
      icon={<UserOutlined />}
      src={url}
    />
  );
};

export default UserAvatar;
