import React from "react";
import { Layout, Row, Col } from "antd";

import { StyledContent, HeaderLink } from "./styled";

import LogoutButton from "../LogoutButton";

import Cookies from "js-cookie";

const { Header } = Layout;

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const token = Cookies.get("auth_token");
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return (
      <Layout>
        <Header style={{ backgroundColor: "var(--clr-light-blue)" }}>
          <Row justify="space-between">
            <Col
              xs={{ span: 20 }}
              sm={{ span: 14 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <Row justify="space-around">
                <Col>
                  <HeaderLink to="/">News</HeaderLink>
                </Col>
                <Col>
                  <HeaderLink to="/reviews">Reviews</HeaderLink>
                </Col>
                <Col>
                  <HeaderLink to="/dashboard">Dashboard</HeaderLink>
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
        <StyledContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              height: "100%",
            }}
          >
            Login to view this page!
          </div>
        </StyledContent>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header style={{ backgroundColor: "var(--clr-light-blue)" }}>
        <Row justify="space-between">
          <Col
            xs={{ span: 20 }}
            sm={{ span: 14 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <Row justify="space-around">
              <Col>
                <HeaderLink to="/">News</HeaderLink>
              </Col>
              <Col>
                <HeaderLink to="/reviews">Reviews</HeaderLink>
              </Col>
              <Col>
                <HeaderLink to="/dashboard">Dashboard</HeaderLink>
              </Col>
              <Col>
                <HeaderLink to="/notes">Notes</HeaderLink>
              </Col>
            </Row>
          </Col>
          <Col>
            <LogoutButton />
          </Col>
        </Row>
      </Header>
      <StyledContent>{children}</StyledContent>
    </Layout>
  );
};

export default PageLayout;
