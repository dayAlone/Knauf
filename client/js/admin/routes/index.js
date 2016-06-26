import React from 'react'
import { Redirect, Route } from 'react-router'
import App from '../containers/App'

export default function configureRoutes() {
    return (
        <Route path='/admin/' component={App} name='Начальная страница'>
            <Redirect from='/*' to='/*/' />
        </Route>
    )
}
