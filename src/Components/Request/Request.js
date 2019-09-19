import React, { Component } from 'react'
import './request.scss'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

export class Request extends Component {
    state = {
        toggleInfo: false
    }
    deleteRequest = () => {
        axios.delete(`/request/${this.props.request_id}`)
            .then(() => {
                this.props.history.push(`/chat/${this.props.id}`)
            })
            .catch(() => console.log(`failed to delete request`))
    }
    render() {
        const style = this.state.toggleInfo ? {
            whiteSpace: 'initial',
            textOverflow: 'ellipsis',
            overflow: 'visible'
        } : {
                overflow: 'hidden',
                width: '50vw',
                display: 'inline-block',
                height: '55px'
            }
        return (
            <div className='request-wrapper'>
                <div className='request-container'>
                    <div
                        onClick={() => this.setState({ toggleInfo: !this.state.toggleInfo })} style={style} className={`request-text ${this.state.toggleInfo ? null : `block-with-text`}`}>
                        {this.props.request_info}
                        <div>
                            <button onClick={this.deleteRequest } className='answer-btn'>Answer</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Request)