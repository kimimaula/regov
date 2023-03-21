import { Input } from "antd";
import { StyledForm } from "./styled";

const { TextArea } = Input;

interface TextAreaFieldProps {
  label: string;
  name: string;
  rules: any[];
  maxLength?: number;
}

const TextAreaField = ({
  label,
  name,
  rules,
  maxLength = 100,
}: TextAreaFieldProps) => {
  return (
    <StyledForm labelCol={{ span: 24 }} label={label} name={name} rules={rules}>
      <TextArea autoSize={{ minRows: 4, maxRows: 6 }} maxLength={maxLength} />
    </StyledForm>
  );
};

export default TextAreaField;
