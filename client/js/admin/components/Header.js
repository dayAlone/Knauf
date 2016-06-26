import React from 'react'

import { Row, Col } from 'pui-react-grids'


export default (props) => (
    <Row style={{ flexBasis: 'calc(100% + 20px)' }} className='pll prl mts mbxs'>
        <Col md={16}>
            <h1 classNam='title'>Knauf<strong>Admin</strong></h1>
        </Col>
        <Col md={8}>
            {props.children}
        </Col>

    </Row>
)
