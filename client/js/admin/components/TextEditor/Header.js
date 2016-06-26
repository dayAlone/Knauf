import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as textsActions from '../../actions/texts'
import { bindActionCreators } from 'redux'

import { Row, Col } from 'pui-react-grids'
import { Input } from 'pui-react-inputs'
import { Icon } from 'pui-react-iconography'
import { DefaultButton } from 'pui-react-buttons'

@connect(
    state => ({
        texts: state.texts,
    }),
    dispatch => ({
        actions: bindActionCreators(textsActions, dispatch)
    })
)
class Header extends Component {
    constructor() {
        super()
        this.onChange = this.onChange.bind(this)
        this.onReset = this.onReset.bind(this)
    }
    onChange(e) {
        const { actions: { setSearch } } = this.props
        setSearch(e.target.value)
    }
    onReset() {
        const { actions: { setSearch } } = this.props
        setSearch(false)
    }
    render() {
        const { texts: { search } } = this.props
        return (
            <Row style={{ flexBasis: 'calc(100% + 20px)' }} className='pll prl mts mbxs'>
                <Col md={16}>
                    <h1 classNam='title'>🎉 Texts <strong>Editor</strong></h1>
                </Col>
                <Col md={8}>
                    <div style={{ width: search ? 'calc(100% - 60px)' : '100%', float: 'left' }} className='mrl'>
                        <Input
                            className='mbn pn type-xs'
                            ref='search'
                            value={search || ''}
                            placeholder='Здесь можно поискать необходимые поля'
                            onChange={this.onChange}
                        />
                    </div>
                    {search ?
                        <DefaultButton style={{ height: '42px' }} onClick={this.onReset}>
                            <Icon className='type-dark-4' name='times' size='h4' />
                        </DefaultButton>
                        : null}
                </Col>

            </Row>
        )
    }
}

export default Header
