import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Layout, Divider, Spin } from "antd";
import "./Login.scss";
import Logo from "./assets/logo.png";
import LoginLogo from "./assets/login.png";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoginOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";
import PasswordResetRequest from "../Register/PasswordResetRequest";
import { BACKEND_BASE_URL } from "../constant";

const { Header } = Layout;

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState("");
  const [loading, setLoading] = useState(false); //additional
  const [isError, setIsError] = useState(false);

  const history = useNavigate();

  const loginHandler = async (e) => {
    //handler method for login

    setLoading(true);
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${BACKEND_BASE_URL}/api/auth/login`,
        { email, password },
        config
      );

      const username = data?.username.split(" ");

      localStorage.setItem("authToken", data.token); //set the browser caching or local storage for globally accessed anywhere in the application
      localStorage.setItem("username", username?.[0]);
      localStorage.setItem("email", data.email);
      localStorage.setItem("type", data?.type);

      setTimeout(() => {
        // set a 5seconds timeout for authentication

        if (data.type === "Admin") history(`/v2/admin-dashboard/${username}`);
        else if (data.type === "Staff") history(`/staff-register`);
        else if (data.type === "Supervisor" || data.type === "Co-Supervisor")
          history(`/v1/${data.type}-dashboard/${username?.[0]}`);
        else if (data.type === "panel")
          history(`/v4/panel-dashboard/${username}/evaluate-presentation`);
        else history(`/v3/${data.type}-dashboard/${username?.[0]}`);

        setLoading(false);
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setAvailable(error.response.data.available);
      setLoading(false);
      setIsError(true);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        setError("");
        setAvailable("");
      }, 5000); //5s
    }
  };

  return (
    <>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <center>
            <img src={Logo} style={{ maxWidth: "100px" }} alt="Logo" />
            <h1 id="header" className="header">
              Sri Lanka Institute of Information Technology{" "}
            </h1>

            <Divider />
          </center>
        </Header>
      </Layout>

      <div className="login-page">
        <Row>
          <Col className="left-side" xl={15} lg={15} md={24} sm={24}>
            <div className="left-side-inner-wrap">
              <div className="title">Research Management System</div>
              <center>
                {error && (
                  <span style={{ color: "white", background: "orange" }}>
                    {error}
                  </span>
                )}
                {available && (
                  <span style={{ color: "white", background: "red" }}>
                    {available}
                  </span>
                )}
              </center>
              <div className="text-block">
                Log in to your account if you already have an account
              </div>
              <Form onFinish={loginHandler}>
                <label>Email</label>
                <Input
                  label={"EMAIL"}
                  name={"email"}
                  size={"large"}
                  placeholder={"e.g admin@example.com"}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <Input.Password
                  label={"PASSWORD"}
                  name={"password"}
                  size={"large"}
                  type="password"
                  placeholder="type your password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br /> <br /> <br />
                {/* <a className="forget-text">Forgot password?</a> */}
                <Link
                  to="/register"
                  className="forget-text"
                  style={{ float: "left" }}
                >
                  Create an account
                </Link>
                <PasswordResetRequest />
                <div className="btn-wrap">
                  <center>
                    {isError && (
                      <small style={{ color: "red" }}>
                        Something went wrong. Please try again later.
                      </small>
                    )}
                    {loading ? (
                      <Button
                        label={"SUBMIT"}
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        disabled={loading}
                        icon={<Spin />}
                      >
                        &nbsp;Authenticating...
                      </Button>
                    ) : (
                      <Button
                        label={"SUBMIT"}
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        icon={<LoginOutlined />}
                        disabled={loading}
                      >
                        SUBMIT
                      </Button>
                    )}
                  </center>
                </div>
              </Form>
            </div>
          </Col>
          <Col className="right-side" xl={9} lg={9} md={0} sm={0}>
            {window.innerWidth > 900 && (
              <div
                className="background-img-container"
                style={{ backgroundImage: `url(${LoginLogo})` }}
              />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
