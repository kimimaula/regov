import styled from "styled-components";
import { Row } from "antd";

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
  width: 50vw;
  @media screen and (max-width: 600px) {
    width: 100vw;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin: 10px 0;
`;

export { LoginContainer, LoginCard, Title };
