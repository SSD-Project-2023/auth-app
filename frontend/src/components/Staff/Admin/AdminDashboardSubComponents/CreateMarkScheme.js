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

const CreateMarkScheme = () => {
  const [loader, setLoader] = useState(false);
  const [schemeName, setSchemName] = useState("");
  const [desc, setDesc] = useState("");
  const [steps, setSteps] = useState("");
  const [totalMarks, steTotalMarks] = useState("");

  const [loading, setLoading] = useState(false); //additional
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
  }, []);

  const schemeHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    const formData = new FormData();
    formData.append("schemeName", schemeName);
    formData.append("desc", desc);
    formData.append("steps", steps);
    formData.append("totalMarks", totalMarks);
    
    try {
      await axios.post(
        //use axios API
        `${BACKEND_BASE_URL}/mark-scheme/create`,

        formData,

        config
      );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully Submitted the Scheme details 😘",
          placement,
        });
        form.resetFields();
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
          onFinish={() => schemeHandler("top")}
          encType="multipart/form-data"
        >
          <center>
            {error && <span style={{ color: "red" }}>{error}</span>}
            <h1>Create Mark-Scheme</h1>
          </center>
          <Form.Item
            name="Scheme Name"
            label="Scheme Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your Scheme Name"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please provide your Scheme Name">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={100}
              onChange={(e) => setSchemName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="Description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your description"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please provide your description">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={200}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="steps"
            label="steps"
            rules={[
              {
                required: true,
              },
              { max: 300 },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="enter your steps"
              prefix={<FileDoneOutlined className="site-form-item-icon" />}
              suffix={[
                <Tooltip title="Enter your steps ex: Rs. 500">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>,
              ]}
              showCount
              maxLength={300}
              onChange={(e) => setSteps(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="Total Marks"
            label="Total Marks"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your Total Marks"
              prefix={<FileDoneOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter Total Marks ex: 20">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={10}
              onChange={(e) => steTotalMarks(e.target.value)}
              type="number"
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

export default CreateMarkScheme;
