import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as textsActions from '../../../actions/texts'
import { bindActionCreators } from 'redux'

import { Input } from 'pui-react-inputs'


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
            value: changes[code] ? changes[code] : value,
            timer: false
        }
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const { changes, el: { code } } = nextProps
        clearTimeout(this.state.timer)
        if (!changes[code]) this.setState({ value: this.props.el.value })
    }
    onChange(e) {
        clearTimeout(this.state.timer)
        const value = e.target.value
        this.setState({
            value,
            timer: setTimeout(() => {
                const { actions, el } = this.props
                if (value === el.value) {
                    actions.removeChange(el.code)
                } else {
                    actions.setChange(el.code, value)
                }
                this.setState({ timer: false })
            }, 400)
        })
    }
    componentWillUnmount() {
        clearTimeout(this.state.timer)
    }
    render() {
        const { style, className } = this.props
        return (
            <Input
                style={style}
                className={`mts mbn ${className}`}
                value={this.state.value}
                onChange={this.onChange}
            />
        )
    }
}

export const InputString = Field
