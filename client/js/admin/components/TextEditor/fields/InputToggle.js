import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as textsActions from '../../../actions/texts'
import { bindActionCreators } from 'redux'

import { Toggle } from 'pui-react-toggle'


@connect(
    state => ({
        changes: state.texts.changes
    }),
    dispatch => ({
        actions: bindActionCreators(textsActions, dispatch)
    })
)
class Field extends Component {
    constructor(props) {
        super()
        const { changes, el: { code, value } } = props
        this.state = {
            value: changes[code] ? changes[code] : value.toString() === 'true',
            timer: false
        }
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const { changes, el: { code } } = nextProps
        if (!changes[code]) this.setState({ value: this.props.el.value })
    }

    onChange() {
        clearTimeout(this.state.timer)
        const value = !this.state.value
        this.setState(
            { value },
            () => {
                const { actions, el } = this.props
                if (value.toString() === el.value) {
                    actions.removeChange(el.code)
                } else {
                    actions.setChange(el.code, !this.state.value)
                }
                this.setState({ timer: false })
            }
        )
    }
    render() {
        return (
            <div className='mts mbn' style={{ transform: 'scale(.6)', transformOrigin: 'left center' }}>
                <Toggle
                    className='toggle-switch toggle-switch-lg'
                    checked={this.state.value}
                    onChange={this.onChange}
                />
            </div>
        )
    }
}

export const InputToggle = Field
