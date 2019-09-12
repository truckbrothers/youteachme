import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Learner.css";
import { connect } from 'react-redux'
import { mentorToggle } from '../../ducks/reducer'
import { Button } from 'antd';

class Learner extends Component {
  constructor() {
    super();

    this.state = {

    };
  }
  render() {
    return (
      <div className="learner-section">
        <div className='header'>
          <span className='l-learner'>Learner</span>
          <span
            className='l-mentor'
            onClick={() => this.props.history.push('/mentor')}
          >Mentor</span>
        </div>
        <div className='message-container'>
          <h1>Ask a Mentor</h1>
          <form>
            <textarea placeholder='Some text...'></textarea>
            <Button className='submit' type="primary">Submit</Button>
          </form>
        </div>

      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { toggleStatus } = reduxState
  return { toggleStatus }
}

export default connect(mapStateToProps, { mentorToggle })(Learner)
