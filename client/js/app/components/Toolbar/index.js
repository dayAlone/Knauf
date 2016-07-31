import './toolbar.styl'
import React, { Component } from 'react'

import { connect } from 'react-redux'

import * as eventActions from '../../actions/events'
import { bindActionCreators } from 'redux'

import Countdown from '../Countdown/'

@connect(
    state => ({
        texts: state.texts
    }),
    dispatch => ({
        ...bindActionCreators(eventActions, dispatch)
    })
)
class Toolbar extends Component {
    onClick() {
        this.props.reachEvent('logo')
    }
    render() {
        const { block, elem, texts: { promo_toolbar, promo_timer_time, promo_timer_text } } = this.props
        return (
            <div block='toolbar' mix={{ block, elem }}>
                <div block='toolbar' elem='logo'>
                    <a href='/'><img src='/layout/images/svg/knauf.svg' alt='' /></a>
                </div>
                <div block='toolbar' elem='title'>{promo_toolbar}</div>
                <div block='toolbar' elem='timer'>
                    <Countdown till={promo_timer_time} pretext={promo_timer_text} />
                </div>
            </div>
        )
    }
}

export default Toolbar
