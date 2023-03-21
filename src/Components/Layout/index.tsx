import React from "react";
import { Layout, Row, Col } from "antd";

import { StyledContent, HeaderLink } from "./styled";

const { Header } = Layout;

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <Layout>
      <Header style={{ backgroundColor: "var(--clr-light-blue)" }}>
        <Row justify="space-between">
          <Col
            xs={{ span: 16 }}
            sm={{ span: 12 }}
            md={{ span: 10 }}
            lg={{ span: 6 }}
          >
            <Row justify="space-around">
              <Col>
                <HeaderLink to="/">Home</HeaderLink>
              </Col>
              <Col>
                <HeaderLink to="/reviews">Reviews</HeaderLink>
              </Col>
              <Col>
                <HeaderLink to="/notes">Notes</HeaderLink>
              </Col>
            </Row>
          </Col>
          <Col>
            <HeaderLink to="/login">Log In</HeaderLink>
          </Col>
        </Row>
      </Header>
      <StyledContent>{children}</StyledContent>
    </Layout>
  );
};

export default PageLayout;
