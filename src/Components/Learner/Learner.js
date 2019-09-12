import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Learner.css";
import { connect } from 'react-redux'
import { mentorToggle } from '../../ducks/reducer'

class Learner extends Component {
  constructor() {
    super();

    this.state = {

    };
  }
  render() {
    return (
      <div className="learner-section">
        <div>
          <span className='l-learner'>Learner</span>
          <span
            className='l-mentor'
            onClick={() => this.props.history.push('/mentor')}
          >Mentor</span>
        </div>
        <h1>Learner Mode</h1>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { toggleStatus } = reduxState
  return { toggleStatus }
}

export default connect(mapStateToProps, { mentorToggle })(Learner)
