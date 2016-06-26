import React, { Component } from 'react'

import { Icon } from 'pui-react-iconography'

import { connect } from 'react-redux'
import * as textsActions from '../../actions/texts'
import { bindActionCreators } from 'redux'

import { LowlightButton, HighlightAltButton } from 'pui-react-buttons'
import pluralize from '../../libs/pluralize'
import { Row, Col } from 'pui-react-grids'


@connect(
    state => ({
        texts: state.texts,
    }),
    dispatch => ({
        actions: bindActionCreators(textsActions, dispatch)
    })
)
class Footer extends Component {
    constructor() {
        super()
        this.onReset = this.onReset.bind(this)
        this.onSave = this.onSave.bind(this)
    }
    onSave() {
        const { actions: { startSaving }, texts: { changes } } = this.props
        startSaving(changes)
    }
    onReset() {
        const { actions: { resetChanges } } = this.props
        resetChanges()
    }
    render() {
        const { saving } = this.props.texts
        const changes = Object.keys(this.props.texts.changes).length
        return (
            <div className={`footer ${changes > 0 ? 'footer--active' : null}`}>
                <div className='container'>
                    <Row>
                        <Col xs={12}>
                            <LowlightButton onClick={this.onReset}>Отменить</LowlightButton>
                        </Col>
                        <Col xs={12} className='txt-r'>
                            <span className='type-sm mrxl type-dark-6 ptm'>Изменено {changes} {pluralize(changes, ['поле', 'поля', 'полей'])}</span>
                            {saving ?
                                <HighlightAltButton disabled>
                                    Сохранение
                                    &nbsp;<Icon spin name='circle-o-notch' size='h3' style={{ height: '24px', width: '19px' }} />
                                </HighlightAltButton>
                                : <HighlightAltButton onClick={this.onSave}>
                                    Сохранить
                                </HighlightAltButton>
                            }
                        </Col>
                    </Row>

                </div>
            </div>
        )
    }
}


export default Footer
