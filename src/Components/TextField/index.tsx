import { Input } from "antd";
import { StyledForm } from "./styled";

interface TextFieldProps {
  label: string;
  name: string;
  rules: any[];
  type?: "default" | "password";
  maxLength?: number;
  disabled?: boolean;
}

const TextField = ({
  label,
  name,
  rules,
  type = "default",
  maxLength = 30,
  disabled = false,
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
      <Input disabled={disabled} maxLength={maxLength} />
    </StyledForm>
  );
};

export default TextField;
