// antd
import { Form, Button } from "antd";
import { ReactElement } from "react";

type btnType = "primary" | "ghost" | "dashed" | "link" | "text" | "default";

interface CustomBtnProps {
  type: btnType;
  icon?: any;
  children: ReactElement | string;
  onClick?: () => any;
  htmlType?: "button" | "submit";
  danger?: boolean;
}

const CustomBtn = ({
  type,
  icon,
  children,
  htmlType = "submit",
  danger = false,
}: CustomBtnProps) => {
  return (
    <Form.Item>
      <Button
        icon={icon}
        type={type as any}
        htmlType={htmlType}
        danger={danger}
      >
        {children}
      </Button>
    </Form.Item>
  );
};

export default CustomBtn;
