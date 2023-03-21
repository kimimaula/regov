import styled from "styled-components";
import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;

const StyledContent = styled(Content)`
  height: calc(100vh - 64px);
  padding: 10px;
`;

const HeaderLink = styled(Link)`
  color: white;
`;

export { StyledContent, HeaderLink };
