import React, { useState, Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_BASE_URL } from "./../constant/index";

let StudentGroup = () => {
  const [group_name, setgroup_name] = useState("");
  const [member1_Email, setmember1_Email] = useState("");
  const [member2_Email, setmember2_Email] = useState("");
  const [member3_Email, setmember3_Email] = useState("");
  const [member4_Email, setmember4_Email] = useState("");

  const [member1_Name, setmember1_Name] = useState("");
  const [member2_Name, setmember2_Name] = useState("");
  const [member3_Name, setmember3_Name] = useState("");
  const [member4_Name, setmember4_Name] = useState("");

  const sendData = (e) => {
    e.preventDefault();

    const newStudentGroup = {
      group_name,
      member1_Name,
      member2_Name,
      member3_Name,
      member4_Name,
      member1_Email,
      member2_Email,
      member3_Email,
      member4_Email,
    };
    axios
      .post(`${BACKEND_BASE_URL}/student-group/create`, newStudentGroup)
      .then(() => {
        toast.success("New Student Group Added");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  };

  let demoButton = () => {
    console.log("Button Clicked");
    setgroup_name("Group6");
    setmember1_Email("Geeth@gmail.com");
    setmember2_Email("Shanaka@gmail.com");
    setmember3_Email("Sahan@gmail.com");
    setmember4_Email("Tamali@gmail.com");

    setmember1_Name("Geeth");
    setmember2_Name("Shanaka");
    setmember3_Name("Sahan");
    setmember4_Name("Thamali");
  };

  return (
    <Fragment>
      <div style={{ backgroundColor: "#e6e6e6", minHeight: "890px" }}>
        <h4 className="text-center ">Create Student Group</h4>
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
            <Form.Group className="mb-3" controlId="groupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                value={group_name}
                placeholder="Enter Group Name"
                required
                onChange={(e) => {
                  setgroup_name(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="studentEmail_1">
              <Form.Label>Email address of Student 01</Form.Label>
              <Form.Control
                type="email"
                value={member1_Email}
                placeholder="Enter email address of the student 1"
                required
                onChange={(e) => {
                  setmember1_Email(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="studentName_1">
              <Form.Label>Name of Student 01 </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name of the student 1"
                required
                value={member1_Name}
                onChange={(e) => {
                  setmember1_Name(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="studentEmail_2">
              <Form.Label>Email address of Student 02</Form.Label>
              <Form.Control
                type="email"
                value={member2_Email}
                placeholder="Enter email address of the student 2"
                required
                onChange={(e) => {
                  setmember2_Email(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="studentName_2">
              <Form.Label>Name of Student 02 </Form.Label>
              <Form.Control
                type="text"
                value={member2_Name}
                placeholder="Enter name of the student 2"
                required
                onChange={(e) => {
                  setmember2_Name(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="studentEmail_3">
              <Form.Label>Email address of Student 03</Form.Label>
              <Form.Control
                type="email"
                value={member3_Email}
                placeholder="Enter email address of the student 3"
                required
                onChange={(e) => {
                  setmember3_Email(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="studentName_3">
              <Form.Label>Name of Student 03</Form.Label>
              <Form.Control
                type="text"
                value={member3_Name}
                placeholder="Enter name of the student 3"
                required
                onChange={(e) => {
                  setmember3_Name(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="studentEmail_4">
              <Form.Label>Email address of Student 04</Form.Label>
              <Form.Control
                type="email"
                value={member4_Email}
                placeholder="Enter email address of the student 4"
                required
                onChange={(e) => {
                  setmember4_Email(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="studentName_4">
              <Form.Label>Name of Student 04 </Form.Label>
              <Form.Control
                type="text"
                value={member4_Name}
                placeholder="Enter name of the student 4"
                required
                onChange={(e) => {
                  setmember4_Name(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ marginLeft: "120px", marginBottom: "15px" }}
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

export default StudentGroup;
