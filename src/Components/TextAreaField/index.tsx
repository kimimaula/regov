import { Input } from "antd";
import { StyledForm } from "./styled";

const { TextArea } = Input;

interface TextAreaFieldProps {
  label: string;
  name: string;
  rules: any[];
  maxLength?: number;
  disabled?: boolean;
}

const TextAreaField = ({
  label,
  name,
  rules,
  maxLength = 100,
  disabled = false,
}: TextAreaFieldProps) => {
  return (
    <StyledForm labelCol={{ span: 24 }} label={label} name={name} rules={rules}>
      <TextArea
        disabled={disabled}
        autoSize={{ minRows: 4, maxRows: 6 }}
        maxLength={maxLength}
      />
    </StyledForm>
  );
};

export default TextAreaField;
