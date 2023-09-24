import React from "react";
import ReactDOM from "react-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PasswordResetRequest from "../components/Register/PasswordResetRequest";
import ResetPassword from "../components/Register/ResetPassword";
import StaffRegister from "../components/Register/StaffRegister";

import { render } from "@testing-library/react";
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
  ReactDOM.render(
    <Router>
      <Login></Login>
    </Router>,
    div
  );
});
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Register></Register>
    </Router>,
    div
  );
});
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <StaffRegister></StaffRegister>
    </Router>,
    div
  );
});
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <ResetPassword></ResetPassword>
    </Router>,
    div
  );
});
it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <PasswordResetRequest></PasswordResetRequest>
    </Router>,
    div
  );
});
