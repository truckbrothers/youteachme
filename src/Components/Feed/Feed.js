import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./feed.css";
import { connect } from 'react-redux'
import { mentorToggle } from '../../ducks/reducer'

class Feed extends Component {
  constructor() {
    super();

    this.state = {

    };
  }

  toggleMentor = () => {
    this.props.mentorToggle()
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
        {this.props.toggleStatus ?
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

function mapStateToProps(reduxState) {
  const { toggleStatus } = reduxState
  return { toggleStatus }
}

export default connect(mapStateToProps, { mentorToggle })(Feed)
