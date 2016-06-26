import React from 'react'
import { Row, Col } from 'pui-react-grids'
import getEditComponent from '../../libs/getEditComponent'

export default (props) => {
    const { className, el, el: { name, type, code }, style } = props
    return (
        <Row className={className}>
            <Col xs={8} style={style}>

                <h4 className={name.length < 10 ? 'h3' : null}>
                    <strong>{name}</strong>
                </h4>

                <span className='label bg-accent-5 mtn' style={labelStyle}>{code}</span>

                {type !== 'text' ?
                    <span className='label bg-brand-9 mtn mls' style={labelStyle}>{type}</span>
                    : null}

            </Col>
            <Col xs={16}>
                {getEditComponent(el)}
            </Col>
        </Row>
    )
}

const labelStyle = { fontSize: 9, fontWeight: 500, letterSpacing: '1px', opacity: 0.5 }
