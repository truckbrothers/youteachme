import React, { Component } from 'react';
import './mentorcheck.css';
import { Button } from 'antd';
import axios from 'axios'
import { connect } from 'react-redux'

class MentorCheck extends Component {
  
    state = {
        mentorStatus: ''
    }


    componentDidMount = () => {
        axios.get(`/users/mentor-status/${this.props.user_id}`)
        .then( res => {
            console.log(res.data[0].mentor_status)
            this.setState({
                mentorStatus: res.data[0].mentor_status
            })
        })
        .catch(err => {
            console.log(err)
        })
    }



    render() {
        return (
            <div className='wrapper'>
                <div className='container'>Would you like to:</div>
                <div className='button-wrapper'>
                    <Button
                        // onCLick={}
                        type="primary"
                        className='mentor-check-btn grow'
                        // onClick={}
                        >
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
function mapStateToProps(reduxState) {
    const { user_id, toggleStatus } = reduxState
    return { user_id, toggleStatus }
}

export default connect(mapStateToProps)(MentorCheck)