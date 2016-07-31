import './App.styl'

import React, { Component } from 'react'
import { connect } from 'react-redux'


import Toolbar from '../../components/Toolbar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

@connect(
    state => ({
        texts: state.texts,
        modal: state.modal,

    })
)
class App extends Component {

    toggleModal(e) {
        this.props.openModal('rules')
        e.preventDefault()
    }
    render() {
        return (
            <div block='app' mods={{ open: this.props.modal !== false }}>
                <div block='app' elem='container'>
                    <Toolbar block='app' elem='toolbar' />
                    <Header />
                    {this.props.children}
                </div>
                <Footer mix={{ block: 'app', elem: 'footer' }}/>
            </div>
        )
    }
}
export default App
