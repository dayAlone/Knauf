import React from 'react'
import { Redirect, Route, IndexRoute } from 'react-router'
import App from '../containers/App'

import IndexPage from '../components/IndexPage/'

export default function configureRoutes() {
    return (
        <Route path='/' component={App} name='Начальная страница'>
            <IndexRoute component={IndexPage} />
            <Redirect from='/*' to='/*/' />
        </Route>
    )
}
