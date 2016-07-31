import './IndexPage.styl'

import React, { Component } from 'react'
import Button from '../Button'

import { connect } from 'react-redux'
@connect(
    state => ({
        texts: state.texts
    })
)
class IndexPage extends Component {
    state = {
        open: false
    }
    onClick(e) {
        this.setState({ open: true })
        e.preventDefault()
    }
    render() {
        const { texts: { promo_buttons_main, promo_buttons_one, promo_buttons_many, promo_steps_1, promo_steps_2, promo_steps_3 } } = this.props
        return (
            <div block='index'>
                <div block='list' mix={{ block: 'index', elem: 'list' }}>
                    <div block='list' elem='item'>
                        <span block='list' elem='icon'>1</span>
                        <span block='list' elem='text' dangerouslySetInnerHTML={{ __html: promo_steps_1 }} />
                    </div>
                    <div block='list' elem='item'>
                        <span block='list' elem='icon'>2</span>
                        <span block='list' elem='text' dangerouslySetInnerHTML={{ __html: promo_steps_2 }} />
                    </div>
                    <div block='list' elem='item'>
                        <span block='list' elem='icon'>3</span>
                        <span block='list' elem='text' dangerouslySetInnerHTML={{ __html: promo_steps_3 }} />
                    </div>
                </div>
                {!this.state.open ?
                    <div block='index' elem='steps'>
                        <img src='/layout/images/footprints1@1x.png' alt='' srcSet='/layout/images/footprints1@1x.png 1x, /layout/images/footprints1@2x.png 2x' />
                        <Button onClick={::this.onClick} block='index' elem='button' href='#'>{promo_buttons_main}</Button>
                        <img src='/layout/images/footprints2@1x.png' alt='' srcSet='/layout/images/footprints2@1x.png 1x, /layout/images/footprints2@2x.png 2x' />
                    </div> :
                    <div block='index' elem='steps'>
                        <Button onClick={::this.onClick} block='index' elem='button' href='/signup/'>{promo_buttons_one}</Button>
                        <Button onClick={::this.onClick} block='index' elem='button' href='/signup/'>{promo_buttons_many}</Button>
                    </div>
                }

            </div>
        )
    }
}

export default IndexPage
