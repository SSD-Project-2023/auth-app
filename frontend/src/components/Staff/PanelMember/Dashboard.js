import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Button, Popover } from "antd";
import {
  LogoutOutlined,
  HomeOutlined,
  FolderOpenFilled,
  SnippetsFilled,
  WechatFilled,
  SettingFilled,
} from "@ant-design/icons";
import "antd/dist/antd.css";
// import "./../Supervisor/styles";
import Logo from "./../Admin/assets/Alogo.png";
import { useNavigate, useParams } from "react-router-dom";

import PasswordResetRequest from "./../../Register/PasswordResetRequest";

import EvaluatePresentation from "./EvaluatePresentation";
import GiveFeedBack from "./giveFeedBack";

const { Header, Content, Footer, Sider } = Layout;

const PanalDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();

  const { id } = useParams();

  const date = new Date();
  const hrs = date.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.setItem("authToken", null);
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    history("/");
  };

  //Profile Pop Over
  const [visible, setVisible] = useState(false);
  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
        {collapsed === false ? (
          <div className="logo">
            <center>
              <p
                onClick={() => {
                  history(
                    `/v4/${localStorage.getItem(
                      "type"
                    )}-dashboard/${localStorage.getItem(
                      "username"
                    )}/evaluate-presentation`
                  );
                  setHeader("dashboard");
                }}
                style={{ cursor: "pointer" }}
              >
                <img src={Logo} className="img" />
                SLIIT
              </p>
            </center>
          </div>
        ) : (
          <center>
            <HomeOutlined
              style={{ color: "white", marginTop: "50px", cursor: "pointer" }}
              onClick={() => {
                history(
                  `/v4/${localStorage.getItem(
                    "type"
                  )}-dashboard/${localStorage.getItem("username")}`
                );
                setHeader("dashboard");
              }}
            />
          </center>
        )}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Menu theme="dark" mode="vertical" selectedKeys={["0"]}>
          <Menu.Item
            key="0"
            icon={<FolderOpenFilled />}
            onClick={() => {
              setHeader("Evaluate Presentation");
              history(
                `/v4/${localStorage.getItem(
                  "type"
                )}-dashboard/${localStorage.getItem(
                  "username"
                )}/evaluate-presentation`
              );
            }}
          >
            Evaluate Presentation
          </Menu.Item>
        </Menu>
        <br />
        <br />
        {collapsed === false ? (
          <center>
            <Button icon={<LogoutOutlined />} onClick={logoutHandler}>
              Sign Out
            </Button>
          </center>
        ) : (
          <center>
            <LogoutOutlined
              style={{ color: "white" }}
              onClick={logoutHandler}
            />
          </center>
        )}
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        ></Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Popover
                style={{ float: "right" }}
                content={
                  <>
                    Password Reset 👇
                    <PasswordResetRequest hidePopOver={() => hide()} />
                    <br />
                    <center>
                      <a onClick={hide}>Close</a>
                    </center>
                  </>
                }
                title={`Hi ${localStorage.getItem("type")}`}
                trigger="click"
                visible={visible}
                onVisibleChange={handleVisibleChange}
              >
                <Button type="primary">
                  <SettingFilled />
                </Button>
              </Popover>
            </Breadcrumb.Item>
          </Breadcrumb>
          {location.pathname ===
            `/v4/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem(
              "username"
            )}/evaluate-presentation` && <EvaluatePresentation />}
          {location.pathname ===
            `/v4/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem(
              "username"
            )}/evaluate-presentation/feedback/${id}` && <GiveFeedBack />}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © {date.getFullYear()} SLIIT
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PanalDashboard;
