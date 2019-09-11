import React, { Component } from "react";
import axios from 'axios';
import { setUser } from '../../ducks/reducer'
import { connect } from 'react-redux'

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
    axios.post('/auth/login', { username, password })
      .then(res => {
        const { username, user_id, user_image } = res.data.user
        this.props.setUser({ username, user_id, user_image })
        if (res.data.user.mentor_status === false) {
          this.props.history.push(`/mentor-check`)
        }
        else {
          this.props.history.push(`/feed`)
        }
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
        this.props.history.push('/feed')
      }
      )
      .catch(err => { alert('register failed', err) })
  }

  render() {
    return (
      <div>
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
              />
              <button onClick={this.login}>login</button>
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
              />
              <button onClick={this.register}>register</button>
            </div>
            
            )}
          <button onClick={() => { this.setState({ register: !this.state.register }) }}>{this.state.register === false ? 'register' : 'cancel'}</button>
        </div>
      </div>
    );
  }
}

export default connect(null, { setUser })(Landing)
