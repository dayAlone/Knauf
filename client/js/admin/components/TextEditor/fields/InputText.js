import React, { Component } from 'react'

import RichTextEditor, { createValueFromString } from 'react-rte'

import { stateFromElement } from 'draft-js-import-element'
import { stateToHTML } from 'draft-js-export-html'

import { connect } from 'react-redux'
import * as textsActions from '../../../actions/texts'
import { bindActionCreators } from 'redux'

@connect(
    state => ({
        changes: state.texts.changes
    }),
    dispatch => ({
        actions: bindActionCreators(textsActions, dispatch)
    })
)
class Input extends Component {
    constructor(props) {
        super()
        const { el: { value, code }, changes } = props
        this.state = {
            value: createValueFromString(changes[code] ? changes[code] : value, 'html'),
            defaultValue: false,
            timer: false
        }
        this.timer = false
        this.onChange = this.onChange.bind(this)
        this.onMount = this.onMount.bind(this)
    }
    componentDidMount() {
        this.onMount()
    }
    componentWillReceiveProps(nextProps) {
        const { changes } = nextProps
        const { value, defaultValue } = this.state

        if (
            Object.keys(this.props.changes).length > 0
            && Object.keys(changes).length === 0
            && defaultValue && defaultValue !== value.toString('html')
        ) {
            clearTimeout(this.state.timer)
            this.setState({ value: createValueFromString(stateToHTML(stateFromElement(this.refs.default)), 'html') })
        }
    }
    componentWillUnmount() {
        clearTimeout(this.state.timer)
    }
    onMount() {
        this.setState({ defaultValue: stateToHTML(stateFromElement(this.refs.default)) })
    }
    onChange(value) {
        clearTimeout(this.state.timer)
        this.setState({
            value,
            timer: setTimeout(() => {
                const { defaultValue } = this.state
                const { changes, actions, el: { code } } = this.props

                if (value.toString('html') === defaultValue && changes[code]) {
                    actions.removeChange(code)
                } else if (defaultValue !== value.toString('html')) {
                    actions.setChange(code, value.toString('html'))
                }
                this.setState({ timer: false })
            }, 400)
        })


    }
    render() {
        return (
            <div>
                <RichTextEditor
                    ref='editor'
                    toolbarClassName='hidden'
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder='Тут обычно пишут интересные тексты'
                />
                <div className='hidden' ref='default' dangerouslySetInnerHTML={{ __html: this.props.el.value }} />
            </div>
        )
    }
}

export const InputText = Input
