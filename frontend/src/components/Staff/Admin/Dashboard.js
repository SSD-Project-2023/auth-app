import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import {
  PullRequestOutlined,
  AuditOutlined,
  LogoutOutlined,
  HomeOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CreateItem from "./AdminDashboardSubComponents/CreateMarkScheme";
import EditUsers from "./AdminDashboardSubComponents/EditUsers";
import ViewUsers from "./AdminDashboardSubComponents/ViewUsers";
import DashboardLogo from "./assets/Alogo.png";
import UploadDocument from "./AdminDashboardSubComponents/UploadDocument";

const { Header, Content, Footer, Sider } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();

  const { username, id } = useParams();

  const location = useLocation();
  const { pathname } = location;

  const date = new Date();
  const hrs = date.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.setItem("authToken", null);
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    history("/");
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
        <br />
        <br />
        {collapsed === false ? (
          <div className="logo">
            <center>
              <p>
                <img src={DashboardLogo} className="img" />
                SLIIT
              </p>
            </center>
          </div>
        ) : (
          <center>
            <HomeOutlined
              style={{ color: "white", marginTop: "50px", cursor: "pointer" }}
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
          mode="inline"
          defaultSelectedKeys={["0"]}
          selectedKeys={
            pathname ===
              `/v2/admin-dashboard/${localStorage.getItem("username")}/view` ||
            pathname ===
              `/v2/admin-dashboard/${localStorage.getItem(
                "username"
              )}/edit/${id}`
              ? ["1"]
              : pathname ===
                `/v2/admin-dashboard/${localStorage.getItem(
                  "username"
                )}/createmarkingscheme`
              ? ["0"]
              : pathname ===
                  `/v2/admin-dashboard/${localStorage.getItem(
                    "username"
                  )}/documents` && ["2"]
          }
        >
          <Menu.Item
            key="0"
            icon={<PullRequestOutlined />}
            onClick={() => {
              history(
                `/v2/admin-dashboard/${localStorage.getItem(
                  "username"
                )}/createmarkingscheme`
              );
            }}
          >
            Create Mark Scheme
          </Menu.Item>
          <Menu.Item
            key="1"
            icon={<AuditOutlined />}
            onClick={() => {
              history(
                `/v2/admin-dashboard/${localStorage.getItem("username")}/view`
              );
            }}
          >
            View Users
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<FilePdfOutlined />}
            onClick={() => {
              history(
                `/v2/admin-dashboard/${localStorage.getItem(
                  "username"
                )}/documents`
              );
            }}
          >
            Upload Document
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
            style={{ fontFamily: "serif", fontSize: "20px" }}
          ></h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>{username}</Breadcrumb.Item>
          </Breadcrumb>
          {(pathname ===
            `/v2/admin-dashboard/${localStorage.getItem(
              "username"
            )}/createmarkingscheme` ||
            pathname ===
              `/v2/admin-dashboard/${localStorage.getItem("username")}`) && (
            <CreateItem />
          )}
          {pathname ===
            `/v2/admin-dashboard/${localStorage.getItem("username")}/view` && (
            <ViewUsers />
          )}
          {pathname ===
            `/v2/admin-dashboard/${localStorage.getItem(
              "username"
            )}/edit/${id}` && <EditUsers />}
          {pathname ===
            `/v2/admin-dashboard/${localStorage.getItem(
              "username"
            )}/documents` && <UploadDocument />}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © {date.getFullYear()} SLIIT
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
