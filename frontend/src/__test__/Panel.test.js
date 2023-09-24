import React from "react";
import EvaluatePresentation from "../components/Staff/PanelMember/EvaluatePresentation";
import GiveFeedBack from "../components/Staff/PanelMember/giveFeedBack";
import ReactDOM from "react-dom";


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
  ReactDOM.render(<EvaluatePresentation></EvaluatePresentation>, div);
});

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GiveFeedBack></GiveFeedBack>, div);
});

