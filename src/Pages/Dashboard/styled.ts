import styled from "styled-components";
import { Table } from "antd";

const StyledTable = styled(Table)`
  .clickable-row {
    cursor: pointer;
  }

  .ant-table-tbody > tr:nth-child(even) > td {
    background-color: var(--clr-white-tertiary);
  }
`;

export { StyledTable };
