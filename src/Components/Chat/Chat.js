import React, { Component } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import socket from '../../sockets'
import './Chat.css'
import axios from 'axios'


class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            message: '',
            scrollBottom: false,
            info: ''
        }
        this.socket = io.connect(':5309')
        socket.on('message sent', data => {
            if (!data) { console.log('problem') }
            this.setState({
                messages: data.messages
            })
            this.scrollToBottom()
        });
    }
    getInfo = () => {
        axios.get(`/request/info/${this.props.match.params.chat_id}`)
            .then(info => {
                this.setState({
                    info: info.data[0].request_info
                })
            })
    }
    sendMessage = (e) => {
        e.preventDefault()
        const { username, user_id } = this.props

        socket.emit('send message', {
            message_text: this.state.message,
            from: username,
            chat_id: this.props.match.params.chat_id,
            user_id: user_id,
            createdAt: moment().startOf('minute').fromNow()
        }
        )
        this.setState({
            message: '',
            scrollBottom: true
        })
    }
    getMessages = () => {
        axios.get(`/messages/${this.props.match.params.chat_id}`)
            .then(messages => {
                this.setState({
                    messages: messages.data
                })
            })
            .catch(err => console.log(`couldn't get messages ${err}`))
    }
    componentDidMount() {
        this.getInfo()
        this.getMessages()
        socket.on('room joined', data => {
        })
        socket.emit('join room', this.props.match.params.chat_id)
        socket.on('get existing messages', this.props.match.params.chat_id)
    }

    scrollToBottom = () => {
        if (this.el) {
            this.el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    handleChange = e => {
        this.setState({
            message: e.target.value
        })
    }
    render() {
        const messageMap = this.state.messages.map((el, i) => (
            el.message_text.includes('@@@') !== true ?
                (
                    <div
                        className={el.user_id === this.props.user_id ? (`right`) : (`left`)}
                        key={el.message_id}
                    >
                        <div
                            className={`${el.user_id === this.props.user_id ? (`right`) : (`left`)} text`}
                        >
                            <p className='message-text'>
                                {el.message_text}
                            </p>
                        </div>
                    </div>)
                :
                (<div
                    className={`${el.user_id === this.props.user_id ? (`right`) : (`left`)} code-message`}
                    key={el.message_id}
                >
                    <div
                        className={`${el.user_id === this.props.user_id ? (`right`) : (`left`)} text code-message`}
                    >
                        <pre className='message-text code-message'>
                            {el.message_text.replace('@@@', '')}
                        </pre>
                    </div>
                </div>)
        ))
        return (
            <div className="Chat">
                <div className='container-container'>
                    <div onClick={this.getMessages} className="request-info">
                        <p className="message-text">
                            {this.state.info}
                        </p>
                    </div>
                    <div className='message-container'>
                        {messageMap}
                    </div>
                </div>
                <button 
                className="exit-chat" 
                onClick={() => this.props.history.goBack()}>
                    Exit
                    </button>
                <div className="chat-input-container">
                    <textarea
                        placeholder="Create new message here. Type @@@ to maintain formatting."

                        onChange={e => this.handleChange(e)}
                        onSubmit={this.sendMessage}
                        value={this.state.message}
                        className="chat-form" />
                    <button
                        className="chat-send"
                        onClick={this.sendMessage}
                    >
                        send
                    </button>
                </div>
                <div ref={el => { this.el = el }} ></div>
            </div>
        )
    }
}
function mapStateToProps(reduxState) {
    const { user_id, username, user_image } = reduxState
    return { user_id, username, user_image }
}

export default connect(mapStateToProps, null)(withRouter(Chat))