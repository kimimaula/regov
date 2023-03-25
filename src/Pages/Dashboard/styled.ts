import styled from "styled-components";
import { Table, Row } from "antd";

const StyledTable = styled(Table)`
  .clickable-row {
    cursor: pointer;
  }

  .ant-table-tbody > tr:nth-child(even) > td {
    background-color: var(--clr-white-tertiary);
  }
`;
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const LoginCard = styled(Row)`
  padding: 15px;
  background-color: var(--clr-white-primary);
  border-radius: 15px;
  border: 0.5px solid var(--clr-grey-primary);
  width: 100%;
  @media screen and (max-width: 600px) {
    width: 100vw;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin: 10px 0;
`;

const StyledCard = styled.div`
  height: 100%;
  border-radius: 15px;
  background-color: white;
  padding: 15px;
`;

export { StyledTable, LoginContainer, LoginCard, Title, StyledCard };
