import React, { Component } from 'react'
import './request.scss'

export default class Request extends Component {
    state = {
        toggleInfo: false
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
                        onClick={() => this.setState({toggleInfo: !this.state.toggleInfo})} style={style} className={`request-text ${this.state.toggleInfo ? null : `block-with-text`}`}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni suscipit ipsum dolores autem omnis id quisquam illum unde commodi voluptas! Est dignissimos odio accusamus ipsum, perferendis dolor quibusdam illum autem!
                        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Error rerum placeat optio reiciendis nostrum sit, quaerat repellendus, omnis incidunt cumque saepe reprehenderit ab alias modi accusamus consectetur ad voluptatem dolorum.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, perferendis? Minima soluta rerum, totam maiores repellendus voluptatibus excepturi dolorum adipisci tenetur provident eos eveniet tempore voluptates sapiente officia eligendi culpa.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quos nesciunt, optio id accusamus eum provident sed nisi fuga sapiente at architecto alias maiores eos numquam minima deserunt illo adipisci? */}
                        <div>
                        	<button className='answer-btn'>Answer</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

