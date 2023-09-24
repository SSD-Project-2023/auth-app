import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Empty,
  Modal,
  notification,
  Spin,
  Switch,
  Tooltip,
} from "antd";
import { CloseCircleFilled, SafetyCertificateFilled } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { BACKEND_BASE_URL } from "../../../constant";

function ResearchTopics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reject, setReject] = useState(false);
  const [preview, setPreview] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    (async () =>
      await axios.get(`${BACKEND_BASE_URL}/research-topic/`).then((res) => {
        setData(res?.data.filter((el) => el?.status === "PENDING"));
        setLoading(false);
      }))();
  }, []);

  const markType = async (value, type) => {
    const acceptOrRejectBy = localStorage.getItem("username");
    const lastModified = new Date();
    const userEmail = value?.userEmail;
    const topicName = value?.topicName;
    const email = localStorage.getItem("email");
    const supervisor = value?.supervisorName;
    let status = "";
    if (type === "accept") {
      status = "ACCEPTED";
    } else {
      status = "REJECTED";
    }
    await axios
      .put(`${BACKEND_BASE_URL}/research-topic/acceptOrReject/${value?._id}`, {
        status,
        acceptOrRejectBy,
        lastModified,
      })
      .then(() => {
        if (type === "accept") {
          notification.info({
            message: `Notification`,
            description: "Accepted 😘",
            placement: "top",
          });
        } else {
          notification.error({
            message: `Notification`,
            description: "Rejected 😢",
            placement: "top",
          });
        }
      });
    await axios.post(
      `${BACKEND_BASE_URL}/research-topic/notifyStudentBySupervisor`,
      {
        userEmail,
        topicName,
        status,
        email,
        supervisor,
      }
    );
    await axios
      .get(`${BACKEND_BASE_URL}/research-topic/`)
      .then((res) => {
        setData(res?.data.filter((el) => el?.status === "PENDING"));
        setVisible(false);
        setReject(false);
      })
      .catch((error) => alert(error));
  };

  const showModal = (value, type) => {
    if (type === "accept") {
      setVisible(true);
      setValue(value);
    } else if (type === "reject") {
      setReject(true);
      setValue(value);
    } else {
      setPreview(true);
      setValue(value);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setReject(false);
    setPreview(false);
  };

  const handleToggle = async (toggle) => {
    setLoading(true);
    if (toggle)
      await axios
        .get(`${BACKEND_BASE_URL}/research-topic`)
        .then((res) => {
          setData(res?.data.filter((el) => el?.status !== "PENDING"));
          setLoading(false);
        })
        .catch((error) => alert(error));
    else
      await axios
        .get(`${BACKEND_BASE_URL}/research-topic`)
        .then((res) => {
          setData(res?.data.filter((el) => el?.status === "PENDING"));
          setLoading(false);
        })
        .catch((error) => alert(error));
  };

  return (
    <>
      <div style={{ float: "right" }}>
        <i>Show Accepted & Rejected</i> <Switch onChange={handleToggle} />
      </div>
      <br />
      <br />
      {loading ? (
        <center>
          <Spin size="large" style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <>
          {data?.length === 0 ? (
            <Empty />
          ) : (
            <center>
              {data?.map((value) => (
                <div style={{ display: "inline-block" }} key={value?._id}>
                  <Card
                    title={
                      <>
                        <Tooltip
                          title={
                            value?.topicName?.length > 38 && value?.topicName
                          }
                          color="red"
                        >
                          {value?.topicName?.length > 25
                            ? `${value?.topicName.substring(0, 25)}...`
                            : value?.topicName}{" "}
                        </Tooltip>
                        <span style={{ float: "right" }} className="status">
                          {value?.status}
                        </span>
                      </>
                    }
                    bordered
                    style={{ width: 300 }}
                    size="small"
                    actions={[
                      <>
                        {value?.status === "PENDING" &&
                          value?.supervisorName?.split(" ")?.[0] ===
                            localStorage.getItem("username") && (
                            <div onClick={() => showModal(value, "accept")}>
                              <SafetyCertificateFilled
                                style={{ color: "green" }}
                              />
                              <br />
                              Accept
                            </div>
                          )}
                        {value?.status !== "PENDING" && (
                          <>
                            <table>
                              <tr>
                                <td style={{ fontSize: "10px" }}>
                                  {value?.status} by
                                </td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    fontSize: "10px",
                                  }}
                                >
                                  {value?.acceptOrRejectBy?.split(" ")?.[0] ===
                                  localStorage.getItem("username")
                                    ? "You"
                                    : value?.acceptOrRejectBy}
                                </td>
                              </tr>
                            </table>
                          </>
                        )}
                      </>,
                      <>
                        {value?.status === "PENDING" &&
                          value?.supervisorName?.split(" ")?.[0] ===
                            localStorage.getItem("username") && (
                            <div onClick={() => showModal(value, "reject")}>
                              <CloseCircleFilled style={{ color: "red" }} />
                              <br />
                              Reject
                            </div>
                          )}
                        {value?.status !== "PENDING" && (
                          <>
                            <table>
                              <tr>
                                <td style={{ fontSize: "10px" }}>Modified </td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    fontSize: "10px",
                                  }}
                                >
                                  {value?.lastModified}
                                </td>
                              </tr>
                            </table>
                          </>
                        )}
                      </>,
                    ]}
                  >
                    <table style={{ width: "100%" }}>
                      <tr>
                        <td>Category</td>
                        <td style={{ textAlign: "center" }}>
                          {value?.topicCat}
                        </td>
                      </tr>
                      <tr>
                        <td>Faculty</td>
                        <td style={{ textAlign: "center" }}>
                          {value?.faculty}
                        </td>
                      </tr>
                      <tr>
                        <td>Members</td>
                        <td style={{ textAlign: "center" }}>
                          {value?.members}
                        </td>
                      </tr>
                      <tr>
                        <td>Posted</td>
                        <td style={{ textAlign: "center" }}>
                          {moment(value?.date).format("DD-MMMM-YYYY")}
                        </td>
                      </tr>
                      <tr>
                        <td>By</td>
                        <td style={{ textAlign: "center", color: "orange" }}>
                          {value?.userEmail}
                        </td>
                      </tr>
                      <tr>
                        <td>Assignee</td>
                        <td style={{ textAlign: "center" }}>
                          {value?.supervisorName.split(" ")?.[0] ===
                          localStorage.getItem("username")
                            ? "You"
                            : value?.supervisorName}
                        </td>
                      </tr>
                      <tr>
                        <td>Attachment</td>
                        <td style={{ textAlign: "center" }}>
                          {value?.supervisorName.split(" ")?.[0] ===
                          localStorage.getItem("username") ? (
                            <Button onClick={() => showModal(value, "preview")}>
                              View
                            </Button>
                          ) : (
                            <span style={{ color: "red" }}>Access Denied</span>
                          )}
                        </td>
                      </tr>
                    </table>
                  </Card>
                </div>
              ))}
              <Modal
                visible={visible ? visible : reject}
                title={
                  visible
                    ? "Are you sure to accept ?"
                    : "Are you sure to reject ?"
                }
                onCancel={handleCancel}
                width={300}
                footer={false}
              >
                <center>
                  {visible ? (
                    <Button
                      type="primary"
                      htmlType="submit"
                      color="green"
                      onClick={() => markType(value, "accept")}
                    >
                      Accept
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      color="red"
                      onClick={() => markType(value, "reject")}
                    >
                      Reject
                    </Button>
                  )}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button htmlType="button" onClick={handleCancel}>
                    Return
                  </Button>
                </center>
              </Modal>
              <Modal
                visible={preview}
                title={`Preview of the ${value?.topicName}`}
                onCancel={handleCancel}
                footer={false}
                width={800}
              >
                <iframe
                  src={value?.attachment}
                  width="640"
                  height="480"
                  allow="autoplay"
                ></iframe>
              </Modal>
            </center>
          )}
        </>
      )}
    </>
  );
}

export default ResearchTopics;
