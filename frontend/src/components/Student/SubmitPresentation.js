import React from "react";
import { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "./../constant/index";
import { toast } from "react-toastify";

const SubmitDocument = () => {
  const history = useNavigate();
  const email = localStorage.getItem("email");
  // const topic = "topic01";
  // const category = "category01";

  const [doc, setDoc] = useState([]);
  const [topic, settopic] = useState([]);
  const [category, setcategory] = useState([]);

  const upload = async (e) => {
    try {
      e.preventDefault();

      const data = new FormData();

      data.append("email", email);
      data.append("topic", topic);
      data.append("category", category);

      for (var x = 0; x < doc.length; x++) {
        data.append("uploaded_Document", doc[x]);
      }

      const res = await fetch(
        `${BACKEND_BASE_URL}/submit-presentation/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      if (res.ok) {
        setDoc(null);
        toast.success("Document submited successfully");
      }
      if (!res.ok) {
        toast.error("Only .pptx format allowed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <h4 className="text-center ">Submit Documents</h4>
      <div
        style={{
          maxWidth: 800,
          margin: "auto",
          backgroundColor: "#d9d9d9",
          marginTop: "25px",
          padding: "20px",
          borderStyle: "dotted",
          borderRadius: "20px",
        }}
      >
        <form onSubmit={upload} encType="multipart/form-data">
          <h5 className="text-center ">Upload Presentation</h5>
          <Form.Group className="mb-3" controlId="topic">
            <Form.Label>Topic of the Research</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Topic of the Research"
              onChange={(e) => {
                settopic(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Topic Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Topic Category"
              required
              onChange={(e) => {
                setcategory(e.target.value);
              }}
            />
          </Form.Group>
          <div
            style={{
              marginLeft: "45%",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <i class="fa fa-cloud-upload fa-5x" aria-hidden="true"></i>
          </div>
          <div className="form-group">
            <input
              type="file"
              multiple
              required
              filename="uploaded_Document"
              className="form-control-file"
              style={{ marginLeft: "35%", marginBottom: "30px" }}
              onChange={(e) => {
                setDoc(e.target.files);
                toast.info("Please make sure to upload only .pptx files");
              }}
            />
          </div>
          <Button
            type="submit"
            variant="outline-success"
            style={{
              fontSize: "20px",
              marginLeft: "45%",
              borderBlockWidth: "10px",
            }}
          >
            Upload
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default SubmitDocument;
