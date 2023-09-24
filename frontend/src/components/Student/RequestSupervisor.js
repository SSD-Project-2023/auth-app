import React, { useState, Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { BACKEND_BASE_URL } from "./../constant/index";
import { toast } from "react-toastify";

const RequestSupervisor = () => {
  const [topicName, settopicName] = useState("");
  const [topicCat, settopicCat] = useState("");
  const [faculty, setfaculty] = useState("");
  const [members, setmembers] = useState("");
  const [supervisorName, setsupervisorName] = useState("");
  const [attachment, setattachment] = useState("");

  const date = Date().toLocaleString();

  const userEmail = localStorage.getItem("email");

  const sendData = (e) => {
    e.preventDefault();

    const newRequestSupervisor = {
      topicName,
      userEmail,
      topicCat,
      faculty,
      date,
      members,
      supervisorName,
      attachment,
    };
    axios
      .post(`${BACKEND_BASE_URL}/research-topic/register`, newRequestSupervisor)
      .then(() => {
        toast.success("Request has been Send");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  };

  const demoButton = () => {
    console.log("Button Clicked");
    settopicName("Group6");
    settopicCat("networking");
    setfaculty("IT");
    setmembers(4);
    setsupervisorName("Mahinda Kahandagama");
    setattachment(
      "https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwio8cXvitruAhVObn0KHSeuCgIQPAgI"
    );
  };

  return (
    <Fragment>
      <div style={{ backgroundColor: "#e6e6e6", minHeight: "640px" }}>
        <h4 className="text-center ">Request Supervisor</h4>
        <div
          style={{
            backgroundColor: "#f2f2f2",
            maxWidth: "60%",
            margin: "auto",
            borderRadius: "20px",
          }}
        >
          <Form
            style={{ margin: "auto", width: "50%", marginTop: "15px" }}
            onSubmit={sendData}
          >
            <Form.Group className="mb-3" controlId="topicName">
              <Form.Label>Topic name of the research</Form.Label>
              <Form.Control
                type="text"
                value={topicName}
                placeholder="Enter topic name of the research"
                onChange={(e) => {
                  settopicName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="topicCat">
              <Form.Label>Topic category of the research : </Form.Label>
              <Form.Control
                type="text"
                value={topicCat}
                placeholder="Enter Topic category of the research"
                required
                onChange={(e) => {
                  settopicCat(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="faculty">
              <Form.Label>Faculty :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Faculty"
                value={faculty}
                required
                onChange={(e) => {
                  setfaculty(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="members">
              <Form.Label>
                Number of Students in the research group :
              </Form.Label>
              <Form.Control
                type="number"
                value={members}
                placeholder="Enter Number of Students in the research group"
                required
                onChange={(e) => {
                  setmembers(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="supervisorName">
              <Form.Label>Enter name of the supervisor : </Form.Label>
              <Form.Control
                id="supervisor_name"
                type="text"
                value={supervisorName}
                placeholder="Enter name of the supervisor"
                required
                onChange={(e) => {
                  setsupervisorName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="attachment">
              <Form.Label>Links of the attachments : </Form.Label>
              <Form.Control
                type="text"
                value={attachment}
                placeholder="Enter links of the attachments"
                required
                onChange={(e) => {
                  setattachment(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{ marginLeft: "140px", marginBottom: "20px" }}
            >
              Submit
            </Button>
          </Form>
        </div>
        <Button
          style={{ float: "right", marginRight: "60px" }}
          variant="warning"
          size="sm"
          type="button"
          onClick={demoButton}
        >
          Demo Button
        </Button>
      </div>
    </Fragment>
  );
};

export default RequestSupervisor;
