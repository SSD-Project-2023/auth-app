import React from "react";
import Action from "../components/Staff/Supervisor/DashboardSubComponents/Actions";
import EvaluationHistory from "../components/Staff/Supervisor/DashboardSubComponents/EvaluationHistory";
import ResearchTopics from "../components/Staff/Supervisor/DashboardSubComponents/ResearchTopics";
import ChatWithGroups from "../components/Staff/Supervisor/DashboardSubComponents/ChatWithGroups";
import SingleChat from "../components/Staff/Supervisor/DashboardSubComponents/ResearchTopics";
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
  ReactDOM.render(<Action></Action>, div);
});

it("render correct", () => {
  const inputNode = document.getElementById("action");
  expect(inputNode);
});

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<EvaluationHistory></EvaluationHistory>, div);
});

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ResearchTopics></ResearchTopics>, div);
});
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ChatWithGroups></ChatWithGroups>, div);
});
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SingleChat></SingleChat>, div);
});
