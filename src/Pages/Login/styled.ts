import styled from "styled-components";
import { Row } from "antd";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoginCard = styled(Row)`
  padding: 15px;
  background-color: var(--clr-white-primary);
  border-radius: 15px;
  width: 300px;
  border: 0.5px solid var(--clr-grey-primary);
`;

export { LoginContainer, LoginCard };
