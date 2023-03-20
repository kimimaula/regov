import { Form, Input } from "antd";
import { StyledForm } from "./styled";

interface TextFieldProps {
  label: string;
  name: string;
  rules: any[];
  type?: "default" | "password";
}

const TextField = ({
  label,
  name,
  rules,
  type = "default",
}: TextFieldProps) => {
  if (type === "password") {
    return (
      <StyledForm
        labelCol={{ span: 24 }}
        label={label}
        name={name}
        rules={rules}
      >
        <Input.Password />
      </StyledForm>
    );
  }
  return (
    <StyledForm labelCol={{ span: 24 }} label={label} name={name} rules={rules}>
      <Input />
    </StyledForm>
  );
};

export default TextField;
