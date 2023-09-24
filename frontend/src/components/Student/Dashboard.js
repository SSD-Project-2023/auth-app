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
import "./../Staff/Supervisor/styles/Dashboard.css";
import Logo from "./../Staff/Supervisor/assets/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import CarouselView from "./../Staff/Supervisor/DashboardSubComponents/CarouselView";
import PasswordResetRequest from "./../Register/PasswordResetRequest";
import SingleChat from "./../Staff/Supervisor/DashboardSubComponents/SingleChat";

import RequestSupervisor from "./RequestSupervisor";
import StudentGroup from "./StudentGroup";
import SubmitDocument from "./SubmitDocument";
import SubmitPresentation from "./SubmitPresentation";

const { Header, Content, Footer, Sider } = Layout;

const StudentDashboard = () => {
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
      case `/v3/${localStorage.getItem(
        "type"
      )}-dashboard/${localStorage.getItem("username")}/student-group`:
        setHeader("Create Groups");
        break;
      case `/v3/${localStorage.getItem(
        "type"
      )}-dashboard/${localStorage.getItem("username")}/request-supervisor`:
        setHeader("Request Supervisor");
        break;
      case `/v3/${localStorage.getItem(
        "type"
      )}-dashboard/${localStorage.getItem("username")}/submit-document`:
        setHeader("Submit Documents");
        break;
      case `/v3/${localStorage.getItem(
        "type"
      )}-dashboard/${localStorage.getItem("username")}/submit-presentation`:
        setHeader("Submit Presentation");
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
        document.getElementById("header").innerHTML = "Create Groups";
        break;
      case "documents":
        document.getElementById("header").innerHTML = "Request Supervisor";
        break;
      case "chat":
        document.getElementById("header").innerHTML = "Submit Documents";
        break;
      case "presentations":
        document.getElementById("header").innerHTML = "Submit Presentations";
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
                    `/v3/${localStorage.getItem(
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
                  `/v3/${localStorage.getItem(
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
            `/v3/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem("username")}/student-group`
              ? ["0"]
              : location.pathname ===
                `/v3/${localStorage.getItem(
                  "type"
                )}-dashboard/${localStorage.getItem(
                  "username"
                )}/request-supervisor`
              ? ["1"]
              : location.pathname ===
                `/v3/${localStorage.getItem(
                  "type"
                )}-dashboard/${localStorage.getItem(
                  "username"
                )}/submit-document`
              ? ["2"]
              : (location.pathname ===
                  `/v3/${localStorage.getItem(
                    "type"
                  )}-dashboard/${localStorage.getItem(
                    "username"
                  )}/submit-presentation` ||
                  groupName) && ["3"]
          }
        >
          <Menu.Item
            key="0"
            icon={<FolderOpenFilled />}
            onClick={() => {
              setHeader("Create Student Group");
              history(
                `/v3/${localStorage.getItem(
                  "type"
                )}-dashboard/${localStorage.getItem("username")}/student-group`
              );
            }}
          >
            Create Groups
          </Menu.Item>
          <Menu.Item
            key="1"
            icon={<SnippetsFilled />}
            onClick={() => {
              setHeader("Request Supervisor");
              history(
                `/v3/${localStorage.getItem(
                  "type"
                )}-dashboard/${localStorage.getItem(
                  "username"
                )}/request-supervisor`
              );
            }}
          >
            Request Supervisor
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<WechatFilled />}
            onClick={() => {
              setHeader("Submit Document");
              history(
                `/v3/${localStorage.getItem(
                  "type"
                )}-dashboard/${localStorage.getItem(
                  "username"
                )}/submit-document`
              );
            }}
          >
            Submit Documents
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<WechatFilled />}
            onClick={() => {
              setHeader("Submit Presentations");
              history(
                `/v3/${localStorage.getItem(
                  "type"
                )}-dashboard/${localStorage.getItem(
                  "username"
                )}/submit-presentation`
              );
            }}
          >
            Submit Presentations
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
            `/v3/${localStorage.getItem(
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
            `/v3/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem("username")}` && (
            <CarouselView />
          )}
          {location.pathname ===
            `/v3/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem("username")}/student-group` && (
            <StudentGroup />
          )}
          {location.pathname ===
            `/v3/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem(
              "username"
            )}/request-supervisor` && <RequestSupervisor />}
          {location.pathname ===
            `/v3/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem(
              "username"
            )}/submit-document` && <SubmitDocument />}
          {location.pathname ===
            `/v3/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem(
              "username"
            )}/submit-presentation` && <SubmitPresentation />}
          {groupName && <SingleChat />}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © {date.getFullYear()} SLIIT
        </Footer>
      </Layout>
    </Layout>
  );
};

export default StudentDashboard;
