import React, { useState, Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import { BACKEND_BASE_URL } from "./../../constant/index";
import Axios from "axios";

const giveFeedBack = (props) => {
  const id = location.pathname.substring(32);
  console.log(id);
  const [feedback, setfeedback] = useState();

  const UpdateData = (e) => {
    e.preventDefault();

    Axios.put(`${BACKEND_BASE_URL}/submit-presentation/update/${id}`, {
      feedback,
    })
      .then(() => {
        alert("Feedback added");
        window.location.replace("/evaluate-presentation");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Fragment>
      <h4>Give Feedback</h4>
      <Form>
        <Form.Group className="mb-3" controlId="feedback">
          <Form.Label>Feedback</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Feedback"
            onChange={(e) => {
              setfeedback(e.target.value);
            }}
          />
        </Form.Group>

        <Button onClick={UpdateData} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default giveFeedBack;
