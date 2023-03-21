import { Select } from "antd";
import { StyledForm } from "./styled";

interface SelectFieldPropsProps {
  label: string;
  name: string;
  rules: any[];
  options: any;
}

type OptionsProps = {
  id: string;
  value: string;
  text: string;
};

const { Option } = Select;

const SelectFieldProps = ({
  label,
  name,
  rules,
  options = [],
}: SelectFieldPropsProps) => {
  return (
    <StyledForm labelCol={{ span: 24 }} label={label} name={name} rules={rules}>
      <Select>
        {options.map((ops: OptionsProps) => {
          return (
            <Option key={ops.id} value={ops.value}>
              {ops.text}
            </Option>
          );
        })}
      </Select>
    </StyledForm>
  );
};

export default SelectFieldProps;
