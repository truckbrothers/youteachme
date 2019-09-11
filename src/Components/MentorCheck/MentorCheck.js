import React, { Component } from 'react';
import './mentorcheck.css';
import { Button } from 'antd';
import axios from 'axios'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { mentorToggle } from '../../ducks/reducer'

class MentorCheck extends Component {

    state = {
        mentorStatus: ''
    }


    componentDidMount = () => {
        axios.get(`/users/mentor-status/${this.props.user_id}`)
            .then(res => {
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
                        onClick={this.state.mentorStatus ? () => this.props.history.push('/feed') :
                            () => Swal.fire({
                                title: 'Are you sure?',
                                text: "Mentoring is for experts only!",
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, I wanna mentor!'
                            }).then((result) => {
                                if (result.value) {
                                    Swal.fire(
                                        "You're a mentor!",
                                        'Be sure to select some skills.',
                                        'success'
                                    )
                                    this.props.mentorToggle()
                                    this.props.history.push('/profile')
                                }
                            })
                        }
                        type="primary"
                        className='mentor-check-btn grow'>
                        Mentor
                    </Button>
                    <Button
                        onClick={() => this.props.history.push('/feed')}
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
    const { user_id } = reduxState
    return { user_id }
}

export default connect(mapStateToProps, { mentorToggle })(MentorCheck)