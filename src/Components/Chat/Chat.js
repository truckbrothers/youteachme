import React, { Component } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import socket from '../../sockets'
import './Chat.css'
import axios from 'axios'
// import socketIOClient from 'socket.io-client'


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
        // socketIOClient()
        // this.socket.on('david test', data => console.log(data))
    }
    getInfo = () => {
        axios.get(`/request/info/${this.props.match.params.chat_id}`)
            .then(info => {
                console.log(info.data)
                this.setState({
                    info: info.data[0].request_info
                })
            })
    }
    sendMessage = (e) => {
        e.preventDefault()
        // const inputValue = e.target.elements.chatInput.value
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
    componentDidMount() {
        this.getInfo()
        socket.on('room joined', data => {
            // this.setState({

            // })
        })
        socket.emit('join room', this.props.match.params.chat_id)
        socket.on('get existing messages', this.props.match.params.chat_id)
        // console.log('do you even mount?')
        // console.log(this.socket)
        // this.socket.io('get existing messages', messages => {
        //     console.log(messages)
        //     console.log('????')
        //     if (!messages) {console.log('problemo')}

        //     this.setState({
        //         messages: messages
        //     })
        // })
        socket.on('message sent', data => {
            // console.log('hit function')
            // console.log('in socket:',data)
            if (!data) { console.log('problem') }

            // take the data object and set state

            this.setState({

                messages: data.messages

            })
            this.scrollToBottom()

        });
        // socket.on('message sent', data => {
        //     if (!data) {console.log('prob')}

        //     this.setState({
        //         messages:data
        //     })
        // })

    }
    scrollToBottom =() => {

        this.el.scrollIntoView({ behavior: 'smooth'})
        // this.setState({scrollBottom: false})
    }

    handleChange = e => {
        this.setState({
            message: e.target.value
        })
    }
    render() {
        const messageMap = this.state.messages.map((el, i) => (
            <div
                className={el.user_id === this.props.user_id ?   (`right`):(`left`)}
                key={el.message_id}
            >
                <div
                    className={`${el.user_id === this.props.user_id ? (`right`):(`left`)} text`}
                >
                    <p className='message-text'>
                        {el.message_text}
                    </p>
                </div>
            </div>
        ))
        // console.log(this.state.messages)
        return (
            <div className="Chat">
                {/* <Nav /> */}
                {/* <h1 onClick={() => console.log(this.state)}>CHAT {this.props.username}</h1> */}
                {/* <p onClick={this.tester}>test</p> */}
                <div className='container-container'>
                        <div className="request-info">
                            {this.state.info}
                        </div>
                    <div className='message-container'>
                        {messageMap}
                    </div>
                </div>
                <div className="chat-input-container">
                <textarea
                    placeholder="new message"

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
                {/* {this.state.scrollBottom === true ?  */}
                <div  ref={el => {this.el = el}} ></div>
                {/* // :null} */}
            </div>
        )
    }
}
function mapStateToProps(reduxState) {
    const { user_id, username, user_image } = reduxState
    return { user_id, username, user_image }
}

export default connect(mapStateToProps, null)(withRouter(Chat))