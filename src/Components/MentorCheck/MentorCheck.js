import React, { Component } from 'react';
import './mentorcheck.css';

export default class MentorCheck extends Component {
    state = {

    }
    render() {
        return (
            <div className='wrapper'>
                <div className='container'>Would you like to<br></br>
                    <button>Mentor</button><br></br>
                    Or<br></br>
                    <button>Start Your Learning</button>
                </div>
            </div>
        )
    }
};
