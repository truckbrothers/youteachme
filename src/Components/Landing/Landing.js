import React, { Component } from "react";
import axios from 'axios';
import {setUser} from '../../ducks/reducer'
import {connect} from 'react-redux'

class Landing extends Component {
  constructor() {
    super();

    this.state = {
      usernameInput: "",
      passwordInput: "",
      register: false,
    };
  }

  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  login = () => {
    const {
      usernameInput: username,
      passwordInput: password
    } = this.state
    axios.post('/auth/login', {username, password})
      .then(res => {
        const {username, user_id, user_image} = res.data.user
        this.props.setUser({ username, user_id, user_image})
        if (res.data.user.mentor_status === true) {
          this.props.history.push(`/mentor-check`)
        }
        else {
          this.props.history.push(`/mentor-check`)
        }
      })
      .catch(err => {alert('login failed')})
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
            <p>Password:</p>
            <input
              onChange={e => this.handleChange(e, "passwordInput")}
              type="password"
            />
            <button onClick={this.login}>login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {setUser})(Landing)
