import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Mentor.css";
import { connect } from 'react-redux'
import { mentorToggle } from '../../ducks/reducer'
import axios from 'axios'
import Request from '../Request/Request'

export class Mentor extends Component {
    constructor() {
        super();

        this.state = {
            requests: []
        };
    }
    getRequests = () => {
        axios.get(`/request/${this.props.user_id}`)
            .then(request => this.setState({ requests: request.data }))
            .catch(err => console.log(`couldn't get requests`))
    }

    componentDidMount() {
        this.getRequests()
    }
    render() {
        const requestsMap = this.state.requests.map(((el, i) => (
            <Request
                key={el.request_id}
                request_info={el.request_info}
                id={el.chat_id}
                request_id={el.request_id}
            />
        )))
        return (
            <div className='mentor-section'>
                <div className='header'>
                    <span
                        className='m-learner'
                        onClick={() => this.props.history.push('/learner')}
                    >Learn
                    </span>
                    <span className='m-mentor'>Mentor</span>
                </div>
                <h1>Mentor Questions</h1>
                <hr></hr>
                {requestsMap}
            </div>
        );
    }
}

function mapStateToProps(reduxState) {
    const { toggleStatus, user_id } = reduxState
    return { toggleStatus, user_id }
}

export default connect(mapStateToProps, { mentorToggle })(Mentor)
