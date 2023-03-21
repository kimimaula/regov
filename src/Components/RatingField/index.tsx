import { Rate } from "antd";
import { StyledForm } from "./styled";

interface SelectFieldPropsProps {
  label: string;
  name: string;
  rules: any[];
}

const SelectFieldProps = ({ label, name, rules }: SelectFieldPropsProps) => {
  return (
    <StyledForm labelCol={{ span: 24 }} label={label} name={name} rules={rules}>
      <Rate />
    </StyledForm>
  );
};

export default SelectFieldProps;
