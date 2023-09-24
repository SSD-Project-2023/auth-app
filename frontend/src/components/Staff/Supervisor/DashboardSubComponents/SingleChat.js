import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  Divider,
  Empty,
  Form,
  Input,
  notification,
  Spin,
} from "antd";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../constant";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteFilled, EditFilled, LeftSquareFilled } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";

const App = () => {
  const [data, setData] = useState([]);
  const [research, setResearch] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [disable, setDisable] = useState(true);
  const [edit, setEdit] = useState(true);

  const [comment, setComment] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [deleteFlag, setDeleteFlag] = useState("");

  const { groupName } = useParams();
  const history = useNavigate();

  useEffect(() => {
    (async () =>
      await axios
        .get(`${BACKEND_BASE_URL}/student-group/getGroup/${groupName}`)
        .then(async (res) => {
          setData(res?.data);
          await axios
            .get(
              `${BACKEND_BASE_URL}/research-topic/checkTopic/${res?.data?.member1_Email}/${res?.data?.member2_Email}/${res?.data?.member3_Email}/${res?.data?.member4_Email}`
            )
            .then((res) => {
              setResearch(res?.data);
              setLoading(false);
            });
          await axios
            .get(`${BACKEND_BASE_URL}/chat/getComment/${groupName}`)
            .then((res) => {
              setCommentData(res?.data);
            });
        }))();
  }, [comment, deleteFlag]);

  const commentHandler = async () => {
    await axios
      .post(`${BACKEND_BASE_URL}/chat/create`, {
        comment,
        commentedBy: localStorage.getItem("email"),
        groupName,
        date: new Date(),
      })
      .then(() => {
        notification.info({
          message: `You are successfully commented.`,
          placement: "top",
        });
        setComment("");
      })
      .catch((error) => {
        notification.error({
          message: { error },
          placement: "top",
        });
        setComment("");
      });
  };

  const handleEnable = (id) => {
    setDisable(!disable);
    setEdit(!edit);
    setSelectedKey(id);
  };

  const handleEdit = async (id) => {
    if (comment) {
      await axios
        .put(`${BACKEND_BASE_URL}/chat/updateCommentById/${id}`, {
          comment,
        })
        .then(() =>
          notification.info({
            message: `Comment edited.`,
            placement: "top",
          })
        )
        .catch((error) =>
          notification.info({
            message: { error },
            placement: "top",
          })
        );
      setDisable(true);
    }
    if (comment === "")
      notification.warn({
        message: `Please type a comment.`,
        placement: "top",
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${BACKEND_BASE_URL}/chat/deleteCommentById/${id}`)
      .then(() =>
        notification.info({
          message: `Comment deleted.`,
          placement: "top",
        })
      )
      .catch((error) =>
        notification.error({
          message: { error },
          placement: "top",
        })
      );
    setDeleteFlag(true);
  };

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        onClick={() =>
          history(
            `/v1/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem("username")}/chat`
          )
        }
      >
        <LeftSquareFilled /> Back To Groups
      </div>
      <br />
      {loading ? (
        <center>
          <Spin size="large" style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <>
          {research === null ? (
            <Empty
              description={
                <>
                  <span>No Research Papers Are Submitted By This Group</span>
                  <br />
                  <span style={{ color: "red" }}>
                    CHAT THREAD IS DISABLED FOR {groupName}
                  </span>
                </>
              }
            />
          ) : (
            <center>
              <Card
                title={
                  <div style={{ backgroundColor: "#EAF3F9" }}>
                    {research?.topicName} <br></br>
                    <span style={{ fontSize: "10px" }}>
                      Posted to {groupName} by{" "}
                      {data?.member1_Email ||
                        data?.member2_Email ||
                        data?.member3_Email ||
                        data?.member4_Email}
                    </span>
                  </div>
                }
                bordered={false}
                style={{
                  width: 1000,
                  height: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    backgroundColor: "#FFFCF7",
                  }}
                >
                  <div>
                    <iframe
                      src={research?.attachment}
                      width="500"
                      height="480"
                      allow="autoplay"
                    ></iframe>
                  </div>
                  <div>
                    <span>Post a Comment</span>
                    <br />
                    <Form onFinish={commentHandler}>
                      <Form.Item rules={[{ required: true }]} name="comment">
                        <TextArea
                          allowClear
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder={
                            "Anything you want to add related to the topic given, Please feel free to mention"
                          }
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          className="submit-btn"
                          htmlType="submit"
                          type={"primary"}
                        >
                          SUBMIT
                        </Button>
                      </Form.Item>
                    </Form>
                    <Divider orientation="center" plain>
                      Comments {commentData ? commentData?.length : 0}
                    </Divider>
                    {commentData?.length == 0 ? (
                      <Empty
                        description={
                          <>
                            <span style={{ color: "red" }}>No comments</span>
                          </>
                        }
                      />
                    ) : (
                      commentData?.map((value) => (
                        <>
                          <span style={{ fontSize: "10px" }} key={value?._id}>
                            {value?.commentedBy ===
                            localStorage.getItem("email")
                              ? "You"
                              : value?.commentedBy}{" "}
                            at {moment(value?.date).format("DD MMMM, YYYY")}
                            {localStorage.getItem("email") ===
                              value?.commentedBy && (
                              <span
                                style={{ float: "right", fontSize: "13px" }}
                              >
                                {" "}
                                <EditFilled
                                  style={{ color: "green" }}
                                  onClick={() => handleEnable(value?._id)}
                                />{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <DeleteFilled
                                  style={{ color: "red" }}
                                  onClick={() => handleDelete(value?._id)}
                                />
                              </span>
                            )}
                          </span>
                          {disable ? (
                            <Input value={value?.comment} disabled={disable} />
                          ) : (
                            <>
                              <Input
                                disabled={
                                  localStorage.getItem("email") ===
                                    value?.commentedBy &&
                                  selectedKey === value?._id
                                    ? disable
                                    : true
                                }
                                value={
                                  localStorage.getItem("email") ===
                                    value?.commentedBy &&
                                  selectedKey === value?._id
                                    ? comment
                                    : value?.comment
                                }
                                onChange={(e) => setComment(e.target.value)}
                              />

                              {localStorage.getItem("email") ===
                                value?.commentedBy &&
                                selectedKey === value?._id && (
                                  <Button
                                    className="submit-btn"
                                    htmlType="submit"
                                    type={"primary"}
                                    onClick={() => handleEdit(value?._id)}
                                  >
                                    Save
                                  </Button>
                                )}

                              <br />
                            </>
                          )}
                        </>
                      ))
                    )}
                  </div>
                </div>
              </Card>
            </center>
          )}
        </>
      )}
    </>
  );
};

export default App;
