import { Button, Divider, Form, Input, Layout, notification, Spin } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Logo from "./assets/logo.png";
import "../Login/Login.scss";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { BACKEND_BASE_URL } from "../constant";

const { Header } = Layout;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const { resetToken } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 5000);
  }, []);

  const [form] = Form.useForm();

  const resetPasswordHandler = async () => {
    setLoading(true);
    try {
      await axios.put(`${BACKEND_BASE_URL}/api/auth/passwordreset/${resetToken}`, { password });

      setTimeout(() => {
        notification.info({
          message: "Password Reset Successfully",
          placement: "top",
        });
        setLoading(false);
      }, 3000);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  return (
    <>
      {" "}
      {loader === false ? (
        <center>
          <Spin size="large" style={{ marginTop: "300px" }} />
        </center>
      ) : (
        <div>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{ padding: 0, textAlign: "center" }}
            >
              <center>
                <img src={Logo} style={{ maxWidth: "100px" }} />
                <h1
                  id="header"
                  style={{ fontFamily: "serif", fontSize: "50px" }}
                >
                  Sri Lanka Institute of Information Technology{" "}
                </h1>

                <Divider />
              </center>
            </Header>
          </Layout>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <center>
            <h2>Research Management System</h2>
            <h3 style={{ color: "red" }}>Reset Password Application</h3>
          </center>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={resetPasswordHandler}
          >
            <Form.Item
              name="password"
              label="New-Password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password
                style={{ width: "50%" }}
                placeholder="Enter your new password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                {loading ? (
                  <>
                    <Spin /> Reseting in Progress
                  </>
                ) : (
                  "Reset"
                )}
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="/" className="forget-text">
                Back to Home
              </a>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
