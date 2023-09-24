import React, { useState, useEffect } from "react";
import { Skeleton, Card, Spin, Button, Modal, notification } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../constant";

const { Meta } = Card;

const ViewUsers = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      await axios.get(`${BACKEND_BASE_URL}/api/auth/`).then((res) => {
        setData(res.data);
        setLoading(true);
      });
    })();
  });

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${BACKEND_BASE_URL}/api/auth/delete/${id}`);
      notification.info({
        message: `Notification`,
        description: "Successfully Deleted User 😘",
        placement: "top",
      });
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error,
        placement: "top",
      });
    }
  };

  return (
    <>
      <center>
        <h1>View Users</h1>
      </center>
      {loading === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <>
          <center>
            {data.length === 0 ? (
              <>
                <center>
                  <span style={{ fontSize: "30px" }}>
                    <InboxOutlined width={100} />
                    <br />
                    No Items
                  </span>
                </center>
              </>
            ) : (
              data.map((value, index) => (
                <div
                  key={value._id}
                  style={{ display: "inline-block", marginRight: "50px" }}
                >
                  <Card
                    style={{ width: 360, marginTop: 16 }}
                    actions={[
                      [
                        <>
                          <Link
                            to={`/v2/admin-dashboard/${localStorage.getItem(
                              "username"
                            )}/edit/${value?._id}`}
                          >
                            <div style={{ color: "green" }}>
                              <CheckCircleOutlined />
                              <br />
                              <span>Edit</span>
                            </div>
                          </Link>
                        </>,
                      ],
                      [
                        <>
                          <div
                            style={{ color: "red" }}
                            onClick={() => showModal()}
                          >
                            {" "}
                            <CloseCircleOutlined />
                            <br />
                            <span>Delete</span>
                          </div>
                        </>,
                      ],
                    ]}
                  >
                    <Skeleton loading={!loading} avatar active>
                      <Meta title={`Users ${index + 1}`} />
                    </Skeleton>
                    <span>UserName : {value?.username}</span>
                    <br />
                    <span>Email : {value?.email}</span>
                    <br />
                    <span>Type : {value?.type}</span>
                    <br />
                  </Card>
                  <Modal
                    visible={visible}
                    title={"Are you sure to delete ?"}
                    onCancel={handleCancel}
                    footer={false}
                  >
                    <center>
                      <Button
                        type="primary"
                        htmlType="submit"
                        color="green"
                        onClick={() => {
                          deleteHandler(value._id);
                          setVisible(false);
                        }}
                      >
                        Delete
                      </Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button htmlType="button" onClick={handleCancel}>
                        Return
                      </Button>
                    </center>
                  </Modal>
                </div>
              ))
            )}
          </center>
        </>
      )}
    </>
  );
};

export default ViewUsers;
