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
                <HeaderLink to="/events">Events</HeaderLink>
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
            {isAuthenticated ? (
              <LogoutButton />
            ) : (
              <HeaderLink to="/login">Log In</HeaderLink>
            )}
          </Col>
        </Row>
      </Header>
      <StyledContent>{children}</StyledContent>
    </Layout>
  );
};

export default PageLayout;
