import React, { Component } from 'react';
import './mentorcheck.css';
import { Button } from 'antd';

export default class MentorCheck extends Component {
    state = {

    }
    componentDidMount = () => {

    }
    render() {
        return (
            <div className='wrapper'>
                <div className='container'>Would you like to:</div>
                <div className='button-wrapper'>
                    <Button
                        // onCLick={}
                        type="primary"
                        className='mentor-check-btn grow'>
                        Mentor
                    </Button>
                    <Button
                        type="primary"
                        className='mentor-check-btn grow'>
                        Learn
                    </Button>
                </div>
            </div>
        )

    }
};
