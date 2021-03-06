import React, { Component } from "react";
import axios from 'axios';
import { setUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import './Landing.css'

export class Landing extends Component {
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
    axios.post('/auth/login', { username, password })
      .then(res => {
        const { username, user_id, user_image } = res.data.user
        this.props.setUser({ username, user_id, user_image })
        this.props.history.push(`/mentor-check`)
      })
      .catch(err => { alert('login failed') })
  }
  register = () => {
    const {
      usernameInput: username,
      passwordInput: password
    } = this.state
    axios.post('/auth/register', { username, password, user_image: `https://i.pinimg.com/originals/c6/79/ec/c679ecb1779699dac5edfdbc607eba39.jpg`, mentor_status: false })
      .then(res => {
        console.log(res)
        const { username, user_id, user_image } = res.data.user
        this.props.setUser({ username, user_id, user_image })
        this.props.history.push('/mentor-check')
      }
      )
      .catch(err => { alert('register failed', err) })
  }

  render() {
    return (
      <div className="login-page">
        <header className="login-header">
          <h1>youTeachMe</h1>
        </header>
        <div className="login-input-container">
          {this.state.register === false ?
            (
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
                /><br></br>
                <button onClick={this.login}>Login</button>
              </div>) : (

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
                /><br></br>
                <button onClick={this.register}>Register</button>
              </div>

            )}
          <button onClick={() => { this.setState({ register: !this.state.register }) }}>{this.state.register === false ? 'Register' : 'Cancel'}</button>
        </div>
      </div>
    );
  }
}

export default connect(null, { setUser })(Landing)
