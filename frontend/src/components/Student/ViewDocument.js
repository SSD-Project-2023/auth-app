import React from "react";
import { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "./../constant/index";

const ViewDocument = () => {
  const [document, setdocument] = useState();

  useEffect(() => {
    const fetchDocument = async () => {
      const res = await fetch(`${BACKEND_BASE_URL}/document-upload`);
      const data = await res.json();
      setdocument(data);
    };
    fetchDocument();
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className="row">
        {document?.map((document) => (
          <div key={document._id}>
            <div>
              <h3 className="d-inline-block">Student Email :</h3>
              <h4 className="d-inline-block mb-5">{document.email}</h4>
            </div>

            <div>
              <h3 className="d-inline-block">Submitted word document : </h3>
              <a href={document.doc} download>
                Click to download
              </a>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ViewDocument;
