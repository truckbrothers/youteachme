import React, { Component } from "react";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      usernameInput: "",
      passwordInput: ""
    };
  }

  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <header className="login-header">
          <h1>youTeachMe</h1>
        </header>
        <div className="login-input-container">
          <div>
            <p>Username:</p>
            <input
              onChange={e => this.handleChange(e, "usernameInput")}
              type="text"
            />
            <input />
          </div>
        </div>
      </div>
    );
  }
}
