import React, { useState } from 'react';

function Register() {
  // Register will be our hooks component
  const [state, setState] = useState({
    usernameInput: "",
    emailInput: "",
    passwordInput: ""
  })

  handleChange(e, key) {
    setState({ [key]: e.target.value });
  }
  //we need to add a function for actually registering the user here referenced on the register button
  return (
    <div className="register-page">

      <div className="inputs-container">
        <div className="Logo">
          YouTeachMe
            </div>
        <input
          onChange={e => handleChange(e, 'usernameInput')}
          type="text"
          placeholder="Desired Username"
        />
        <input
          onChange={e => handleChange(e, 'emailInput')}
          type="text"
          placeholder="Email"
        />
        <input
          onChange={e => handleChange(e, 'passwordInput')}
          type="password"
          placeholder="Password"
        />
        <div className="register">
          <div className="register-button">
            <button onClick={registerUser}>Register</button>
          </div>
        </div>
      </div>
      );
}