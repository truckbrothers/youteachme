import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./feed.css";

export default class Feed extends Component {
  constructor() {
    super();

    this.state = {
      toggleMentor: false
    };
  }

  toggleMentor = () => {
    this.setState({
      toggleMentor: !this.state.toggleMentor
    });
  };

  render() {
    return (
      <div>
        <div className='toggle'>
          <span>Learner</span>

          <label className="switch">
            <input
              onClick={() => {
                this.toggleMentor();
              }}
              type="checkbox"
            />
            <span className="slider"></span>
          </label>
          <span>Mentor</span>
        </div>
        {this.state.toggleMentor ? 
        <div className='mentor-section'>
            <h1>Mentor Mode</h1>
        </div>
        :
        <div className="learner-section">
            <h1>Learner Mode</h1>
        </div>
        }
      </div>
    );
  }
}
