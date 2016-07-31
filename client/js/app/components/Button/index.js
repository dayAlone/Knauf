import './Button.styl'

import { Link } from 'react-router'
import React from 'react'

export default (props) => (
    <Link to={props.href} onClick={props.onClick} style={{ textDecoration: 'none' }}>
        <div block='button' mix={{ block: props.block, elem: props.elem }}>
            {props.children}
        </div>
    </Link>
)
