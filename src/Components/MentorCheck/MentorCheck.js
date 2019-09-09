import React, { Component } from 'react';
import './mentorcheck.css';

export default class MentorCheck extends Component {
    state = {

    }
    render() {
        return (
            <div className='title'>Would you like to<br></br>
                <button>Mentor</button><br></br>
                today, or<br></br>
                <button>Start Your Learning</button>
            </div>

        )
    }
};