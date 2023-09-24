import React from "react";
import CreateMarkScheme from "../components/Staff/Admin/AdminDashboardSubComponents/CreateMarkScheme";
import EditUsers from "../components/Staff/Admin/AdminDashboardSubComponents/EditUsers";
import ViewUsers from "../components/Staff/Admin/AdminDashboardSubComponents/ViewUsers";
import UploadDocument from "../components/Staff/Admin/AdminDashboardSubComponents/UploadDocument";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

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
  ReactDOM.render(<CreateMarkScheme></CreateMarkScheme>, div);
});

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<EditUsers></EditUsers>, div);
});

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ViewUsers></ViewUsers>, div);
});

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <UploadDocument></UploadDocument>
    </Router>,
    div
  );
});
