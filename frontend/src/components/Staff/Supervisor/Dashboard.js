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
import "./styles/Dashboard.css";
import Logo from "./assets/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import CarouselView from "./DashboardSubComponents/CarouselView";
import ResearchTopics from "./DashboardSubComponents/ResearchTopics";
import EvaluateDocuments from "./DashboardSubComponents/EvaluateDocuments";
import ChatWithGroups from "./DashboardSubComponents/ChatWithGroups";
import PasswordResetRequest from "../../Register/PasswordResetRequest";
import SingleChat from "./DashboardSubComponents/SingleChat";

const { Header, Content, Footer, Sider } = Layout;

const SupervisorDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();

  const { username, groupName } = useParams();

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

  useEffect(() => {
    switch (location.pathname) {
      case `/v1/${localStorage.getItem(
        "type"
      )}-dashboard/${localStorage.getItem("username")}/research-topics`:
        setHeader("topics");
        break;
      case `/v1/${localStorage.getItem(
        "type"
      )}-dashboard/${localStorage.getItem("username")}/evaluate-documents`:
        setHeader("documents");
        break;
      case `/v1/${localStorage.getItem(
        "type"
      )}-dashboard/${localStorage.getItem("username")}/chat`:
        setHeader("chat");
        break;
      default:
        break;
    }
  }, [location.pathname]);

  const setHeader = (type) => {
    switch (type) {
      case "dashboard":
        document.getElementById("header").innerHTML = "Dashboard";
        break;
      case "topics":
        document.getElementById("header").innerHTML = "Research Topics";
        break;
      case "documents":
        document.getElementById("header").innerHTML = "Evaluate Documents";
        break;
      case "chat":
        document.getElementById("header").innerHTML = "Chat With Groups";
        break;
      default:
        document.getElementById("header").innerHTML = "Dashboard";
        break;
    }
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
                    `/v1/${localStorage.getItem(
                      "type"
                    )}-dashboard/${localStorage.getItem("username")}`
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
                  `/v1/${localStorage.getItem(
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
        <Menu
          theme="dark"
          mode="vertical"
          selectedKeys={
            location.pathname ===
            `/v1/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem("username")}/research-topics`
              ? ["0"]
              : location.pathname ===
                `/v1/${localStorage.getItem(
                  "type"
                )}-dashboard/${localStorage.getItem(
                  "username"
                )}/evaluate-documents`
              ? ["1"]
              : (location.pathname ===
                  `/v1/${localStorage.getItem(
                    "type"
                  )}-dashboard/${localStorage.getItem("username")}/chat` ||
                  groupName) && ["2"]
          }
        >
          <Menu.Item
            key="0"
            icon={<FolderOpenFilled />}
            onClick={() => {
              setHeader("topics");
              history(
                `/v1/${localStorage.getItem(
                  "type"
                )}-dashboard/${localStorage.getItem(
                  "username"
                )}/research-topics`
              );
            }}
          >
            Research Topics
          </Menu.Item>
          <Menu.Item
            key="1"
            icon={<SnippetsFilled />}
            onClick={() => {
              setHeader("documents");
              history(
                `/v1/${localStorage.getItem(
                  "type"
                )}-dashboard/${localStorage.getItem(
                  "username"
                )}/evaluate-documents`
              );
            }}
          >
            Evaluate Documents
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<WechatFilled />}
            onClick={() => {
              setHeader("chat");
              history(
                `/v1/${localStorage.getItem(
                  "type"
                )}-dashboard/${localStorage.getItem("username")}/chat`
              );
            }}
          >
            Chat With Groups
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
        >
          <h1
            id="header"
            style={{ fontFamily: "serif", fontSize: "20px", marginTop: "20px" }}
          >
            {location.pathname ===
            `/v1/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem("username")}`
              ? "Dashboard"
              : groupName && `Chat With ${groupName}`}
          </h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>{username}</Breadcrumb.Item>
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
            `/v1/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem("username")}` && (
            <CarouselView />
          )}
          {location.pathname ===
            `/v1/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem(
              "username"
            )}/research-topics` && <ResearchTopics />}
          {location.pathname ===
            `/v1/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem(
              "username"
            )}/evaluate-documents` && <EvaluateDocuments />}
          {location.pathname ===
            `/v1/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem("username")}/chat` && (
            <ChatWithGroups />
          )}
          {groupName && <SingleChat />}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © {date.getFullYear()} SLIIT
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SupervisorDashboard;
