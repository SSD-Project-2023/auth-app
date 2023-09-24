import React, { Component } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "./../../constant/index";
import { Button, Form } from "react-bootstrap";

export default class Home extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.retrivePosts();
  }

  handleClick(id) {
    window.location.replace(`${location.pathname}/feedback/` + id);
  }

  retrivePosts() {
    axios.get(`${BACKEND_BASE_URL}/submit-presentation`).then((res) => {
      console.log(res.data);
      if (res.data) {
        this.setState({
          posts: res.data,
        });
      }
      console.log(this.state.posts);
    });
  }

  render() {
    return (
      <div className="container">
        <p style={{ color: "black" }}>All Posts</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Topic</th>
              <th scope="col">Description</th>
              <th scope="col">Post Category</th>
              <th scope="col">Feedback</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>

                <td>
                  <a href={`${posts.pptx}`} style={{ textDecoration: "none" }}>
                    {posts.topic}{" "}
                  </a>{" "}
                </td>
                <td>{posts.email}</td>
                <td>{posts.category}</td>
                <td>{posts.feedBack}</td>
                <Button
                  onClick={() => this.handleClick(posts._id)}
                  variant="success"
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  Evaluate
                </Button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
