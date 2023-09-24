import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../constant";
import { Button } from "antd";

const UploadDocument = () => {
  const history = useNavigate();
  const email = localStorage.getItem("email");

  const [doc, setDoc] = useState([]);

  const upload = async (e) => {
    try {
      e.preventDefault();

      const data = new FormData();

      data.append("email", email);

      for (var x = 0; x < doc.length; x++) {
        data.append("uploaded_Document", doc[x]);
      }

      const res = await fetch(`${BACKEND_BASE_URL}/upload-document/upload`, {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        setDoc(null);
        history.replace("/home");
        alert("successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <center>
        <h1>Upload Documents</h1>
        <br />
        <form onSubmit={upload} encType="multipart/form-data">
          <div className="form-group">
            <input
              type="file"
              multiple
              required
              filename="uploaded_Document"
              className="form-control-file"
              onChange={(e) => {
                setDoc(e.target.files);
              }}
            />
          </div>
          <br />
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "215px" }}
          >
            Upload
          </Button>
        </form>
      </center>
    </div>
  );
};

export default UploadDocument;
