import React from "react";
import {
  Collapse,
  Divider,
  List,
  Select,
  Button,
  Form,
  Rate,
  notification,
  Empty,
  Spin,
} from "antd";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../constant";
import { Input } from "antd";
const { TextArea } = Input;
const { Panel } = Collapse;
const { Option } = Select;

const Actions = () => {
  const [data, setData] = useState([]);
  let [scheme, setScheme] = useState([]);
  const [loading, setLoading] = useState(true);

  const [hide, setHide] = useState(true);
  let [selectedScheme, setSelectedScheme] = useState({});
  const [evaluate, setEvaluate] = useState(false);
  const [rate, setRate] = useState("");
  const [comment, setComment] = useState("");

  const [form] = Form.useForm();
  const search = window.location.search;

  useEffect(() => {
    (async () =>
      await axios.get(`${BACKEND_BASE_URL}/document-upload`).then((res) => {
        setData(res?.data.filter((res) => res?.evaluation === "NOT EVALUATED"));
        setLoading(false);
      }))();
    (async () =>
      await axios.get(`${BACKEND_BASE_URL}/mark-scheme/`).then((res) => {
        setScheme(res?.data);
        setLoading(false);
      }))();
  }, [search, evaluate]);

  const genExtra = (value) => <span className="status">{value}</span>;

  const handleChange = (value) => {
    setHide(false);
    selectedScheme = scheme.filter((res) => res?.schemeName === value);
    setSelectedScheme(selectedScheme);
  };

  const handleRate = (value) => setRate(value);

  const setHeader = (value) => (
    <>
      Document [<span style={{ color: "red" }}>{value?.cloudinary_id_doc}</span>
      ] submitted by &nbsp;
      <i style={{ color: "green" }}> {value?.email}</i>
    </>
  );

  const schemeSelection = scheme?.map((res) => res?.schemeName);

  const handleSubmit = async (value) => {
    await axios
      .post(`${BACKEND_BASE_URL}/evaluation-history/create`, {
        status: "EVALUATED",
        comment,
        rate,
        evaluatedBy: localStorage.getItem("email"),
        submittedBy: value?.email,
        date: new Date(),
        docName: value?.cloudinary_id_doc,
      })
      .then(() =>
        notification.info({
          message: `Successfully Evaluated.`,
          placement: "top",
        })
      )
      .then(() => form.resetFields())
      .catch((error) =>
        notification.error({
          message: error,
          placement: "top",
        })
      );
    await axios.put(
      `${BACKEND_BASE_URL}/document-upload/update/${value?._id}`,
      { evaluation: "EVALUATED" }
    );
    await axios.post(
      `${BACKEND_BASE_URL}/evaluation-history/notifyStudentBySupervisor`,
      {
        supervisor: localStorage.getItem("email"),
        comment,
        rate,
        submittedBy: value?.email,
      }
    );
    setEvaluate(true);
  };

  return (
    <>
      <Collapse defaultActiveKey={["1"]}>
        {loading ? (
          <center>
            <Spin size="large" style={{ marginTop: "200px" }} />
          </center>
        ) : data.length === 0 ? (
          <center>
            {" "}
            <Empty
              description={
                <>
                  <span>No Evaluations</span>
                  <br />
                  <span style={{ color: "red" }}>
                    THERE ARE NO DOCUMENTS SUBMITTED
                  </span>
                </>
              }
            />
          </center>
        ) : (
          data.map((value, index) => (
            <Panel
              header={setHeader(value)}
              key={index + 1}
              extra={genExtra(value?.evaluation)}
            >
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div>
                  <b>Preview of the Document</b>
                  <br />
                  <iframe
                    src={`https://view.officeapps.live.com/op/view.aspx?src=${value?.doc}`}
                    width="640"
                    height="480"
                    allow="autoplay"
                  ></iframe>
                  <br />{" "}
                </div>
                <div>
                  <b>Mark Scheme</b>
                  <br /> <br />
                  <Select
                    defaultValue="Select Scheme "
                    style={{
                      width: "100%",
                    }}
                    onChange={handleChange}
                  >
                    {schemeSelection.map((value) => (
                      <Option value={value}>{value}</Option>
                    ))}
                  </Select>{" "}
                  <br />
                  <br />
                  {!hide && (
                    <List size="small" bordered>
                      <List.Item>
                        Schema Name: {selectedScheme?.[0]?.schemeName}
                      </List.Item>
                      <List.Item>
                        Description: {selectedScheme?.[0]?.desc}
                      </List.Item>
                      <List.Item>Steps: {selectedScheme?.[0]?.steps}</List.Item>
                      <List.Item>
                        Total Marks: {selectedScheme?.[0]?.totalMarks}
                      </List.Item>
                    </List>
                  )}
                </div>
              </div>
              <div>
                <Divider orientation="center" plain>
                  Evaluation
                </Divider>
                <center>
                  <Form onFinish={() => handleSubmit(value)} form={form}>
                    <Form.Item name="Rate" rules={[{ required: true }]}>
                      <Rate
                        allowHalf
                        count={10}
                        onChange={handleRate}
                        value={rate}
                      />
                    </Form.Item>
                    <Form.Item
                      name="Evaluation Description"
                      rules={[{ required: true }, { max: 500 }]}
                    >
                      <TextArea
                        maxLength={500}
                        showCount
                        allowClear
                        placeholder={`Evaluate the Document using 
provided Mark Schemes. Type any suggestions or what need to be improved also`}
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        id="action"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                      >
                        Evaluate Now
                      </Button>
                    </Form.Item>
                  </Form>
                </center>
              </div>
            </Panel>
          ))
        )}
      </Collapse>
    </>
  );
};

export default Actions;
