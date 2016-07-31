import './Header.styl'
import React from 'react'

export default (props) => (
    <div block='header'>
        <img
            block='header'
            elem='image'
            src='/layout/images/header@1x.png'
            srcSet='/layout/images/header@1x.png 1x, /layout/images/header@2x.png 2x'
            alt='' />
    </div>
)
