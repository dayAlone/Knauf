import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

import { connect } from 'react-redux'
import * as textsActions from '../../../actions/texts'
import { bindActionCreators } from 'redux'

import 'whatwg-fetch'

@connect(
    state => ({
        texts: state.texts
    }),
    dispatch => ({
        actions: bindActionCreators(textsActions, dispatch)
    })
)
class Input extends Component {
    constructor(props) {
        super()
        const { texts: { changes }, el: { code, value } } = props
        this.state = {
            image: changes[code] ? changes[code] : value.length > 0 ? value : false
        }
        this.uploadImage = this.uploadImage.bind(this)
        this.onOpenClick = this.onOpenClick.bind(this)
        this.onRemoveClick = this.onRemoveClick.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        const { texts: { changes }, el: { code, value } } = nextProps
        if (!changes[code]) {
            this.setState({ image: value.length > 0 ? value : false })
        }
    }
    onOpenClick() {
        this.refs.dropzone.open()
    }
    onRemoveClick() {
        this.setState({ image: false })
        this.refs.dropzone.open()
    }
    uploadImage(files) {
        const data = new FormData()
        const { actions, el } = this.props

        files.forEach(file => {
            data.append('image', file)
        })

        fetch('/admin/upload/',
            {
                method: 'POST',
                body: data
            })
            .then((response) => {
                response
                    .json()
                    .then((responseText) => {
                        this.setState({ image: responseText.image })
                        actions.setChange(el.code, responseText.image)
                    })

            })
    }
    render() {
        return (
            <div>
                <Dropzone style={{ border: 0 }} accept='image/*' ref='dropzone' onDrop={this.uploadImage}>
                    {this.state.image === false ? null : <img src={`${this.state.image}`} alt='' style={{ maxWidth: '100%', border: '1px solid #dddddd', borderRadius: '4px' }} />}
                </Dropzone>
                {
                    this.state.image === false ?
                        <button className='btn btn-highlight-alt type-neutral-11' onClick={this.onOpenClick}>Выбрать файл</button>
                    : <div>

                        <button className='btn btn-danger mtxl' onClick={this.onRemoveClick}>Заменить изображение</button>
                    </div>
                }
            </div>
        )
    }
}

export const InputImage = Input
