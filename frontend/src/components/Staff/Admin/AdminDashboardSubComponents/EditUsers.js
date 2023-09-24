import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Spin,
  Tooltip,
  notification,
  DatePicker,
} from "antd";

import {
  FileDoneOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../constant";

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

const EditUsers = () => {
  const [loader, setLoader] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(localStorage.getItem("type"));

  const [loading, setLoading] = useState(false); //additional
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    (async () =>
      await axios.get(`${BACKEND_BASE_URL}/api/auth/get/${id}`).then((res) => {
        form.setFieldsValue({
          username: res?.data?.username,
          email: res?.data?.email,
          type: res?.data?.type,
        });
        setUserName(res?.data?.username);
        setEmail(res?.data?.email);
        setType(res?.data?.type);
        setLoader(!loader);
      }))();
  }, []);

  const updateUserHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        //use axios API
        `${BACKEND_BASE_URL}/api/auth/update/${id}`,

        { username, email, type },

        config
      );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully updated the User details 😘",
          placement,
        });
        form.resetFields();
        window.location.reload();
      }, 5000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error,
        placement,
      });
      setError(true);
      form.resetFields();
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={() => updateUserHandler("top")}
          encType="multipart/form-data"
        >
          <center>
            {error && <span style={{ color: "red" }}>{error}</span>}
            <h1>Edit Users</h1>
          </center>
          <Form.Item
            name="username"
            label="User Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your User name"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please provide your item name">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={100}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please provide your email">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={100}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="type"
            label="type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="enter your type"
              prefix={<FileDoneOutlined className="site-form-item-icon" />}
              suffix={[
                <Tooltip title="Enter your type ex: Rs. 500">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>,
              ]}
              showCount
              maxLength={20}
              onChange={(e) => setType(e.target.value)}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;
            <Button type="primary" htmlType="submit">
              {loading ? (
                <>
                  <Spin /> Planning in Progess...
                </>
              ) : (
                "Submit"
              )}
            </Button>{" "}
            &nbsp;&nbsp; &nbsp;&nbsp;
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default EditUsers;
