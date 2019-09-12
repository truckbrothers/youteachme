import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Mentor.css";
import { connect } from 'react-redux'
import { mentorToggle } from '../../ducks/reducer'
import axios from 'axios'

class Mentor extends Component {
    constructor() {
        super();

        this.state = {

        };
    }

    render() {
        return (
            <div className='mentor-section'>
                <div>
                    <span
                        className='m-learner'
                        onClick={() => this.props.history.push('/learner')}
                    >Learner
            </span>
                    <span className='m-mentor'>Mentor</span>
                </div>
                <h1>Mentor Mode</h1>
            </div>
        );
    }
}

function mapStateToProps(reduxState) {
    const { toggleStatus } = reduxState
    return { toggleStatus }
}

export default connect(mapStateToProps, { mentorToggle })(Mentor)
