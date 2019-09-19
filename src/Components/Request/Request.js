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
                        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni suscipit ipsum dolores autem omnis id quisquam illum unde commodi voluptas! Est dignissimos odio accusamus ipsum, perferendis dolor quibusdam illum autem!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error rerum placeat optio reiciendis nostrum sit, quaerat repellendus, omnis incidunt cumque saepe reprehenderit ab alias modi accusamus consectetur ad voluptatem dolorum.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, perferendis? Minima soluta rerum, totam maiores repellendus voluptatibus excepturi dolorum adipisci tenetur provident eos eveniet tempore voluptates sapiente officia eligendi culpa.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quos nesciunt, optio id accusamus eum provident sed nisi fuga sapiente at architecto alias maiores eos numquam minima deserunt illo adipisci?
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga ullam fugiat eligendi in quod qui sequi quaerat ab nulla corrupti ut, blanditiis voluptatem consequuntur consectetur soluta labore quisquam totam veritatis.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti animi maiores molestias qui sapiente id optio ad, est aperiam natus quae esse, unde reprehenderit nemo beatae architecto libero sed in.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae repudiandae eos, voluptatum, cupiditate accusamus aliquam repellat rerum eligendi temporibus sit reprehenderit porro cum itaque quas. Asperiores illum qui architecto alias. */}
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