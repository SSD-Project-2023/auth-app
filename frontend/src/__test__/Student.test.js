import React from "react";
import ReactDOM from "react-dom";
import StudentGroup from "./../components/Student/StudentGroup";
import RequestSupervisor from "./../components/Student/RequestSupervisor";
import SubmitDocument from "./../components/Student/SubmitDocument";
import SubmitPresentation from "./../components/Student/SubmitPresentation";

import "@testing-library/jest-dom";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<StudentGroup></StudentGroup>, div);
});

it("render correct", () => {
  const inputNode = document.getElementById("supervisor_name");
  expect(inputNode);
});

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RequestSupervisor></RequestSupervisor>, div);
});

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SubmitDocument></SubmitDocument>, div);
});
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SubmitPresentation></SubmitPresentation>, div);
});
