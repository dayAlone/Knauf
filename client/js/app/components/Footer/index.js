import './Footer.styl'
import React from 'react'



export default (props) => {
    const { block, elem } = props
    return (
        <div block='footer' mix={{ block, elem }}>
            <div block='footer' elem='menu'>
                <a href='/rules/'>Правила акции</a>
                <a href='/rules/'>Регистрация</a>
                {/*<a href='/rules/'>Конкурс</a>*/}
                <a href='/feedback/'>Обратная связь</a>
            </div>
            <a href='/' block='footer' elem='logo'>
                <img src='/layout/images/svg/knauf.svg' alt='' />
            </a>
        </div>
    )
}
