import React from "react";
import { Layout, Row, Col } from "antd";

import { StyledContent, HeaderLink } from "./styled";

import LogoutButton from "../LogoutButton";
import LoginButotn from "../LoginButton";

import Cookies from "js-cookie";

const { Header } = Layout;

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const token = Cookies.get("auth_token");
  const checkAdmin = Cookies.get("isAdmin");
  const isAuthenticated = !!token;
  const isAdmin = checkAdmin === "true";

  return (
    <Layout>
      <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
        <Row justify="space-between">
          <Col
            xs={{ span: 20 }}
            sm={{ span: 14 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <Row gutter={[50, 0]}>
              <Col>
                <HeaderLink to="/">News</HeaderLink>
              </Col>
              <Col>
                <HeaderLink to="/events">Events</HeaderLink>
              </Col>
              {isAuthenticated && (
                <Col>
                  <HeaderLink to="/dashboard">Dashboard</HeaderLink>
                </Col>
              )}
              {isAuthenticated && isAdmin && (
                <Col>
                  <HeaderLink to="/admin">Admin</HeaderLink>
                </Col>
              )}
            </Row>
          </Col>
          <Col>{isAuthenticated ? <LogoutButton /> : <LoginButotn />}</Col>
        </Row>
      </Header>
      <StyledContent>{children}</StyledContent>
    </Layout>
  );
};

export default PageLayout;
