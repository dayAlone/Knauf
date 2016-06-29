import React from 'react'
import { Redirect, Route, IndexRoute } from 'react-router'
import App from '../containers/App'
import TextEditor from '../components/TextEditor'
import UserList from '../components/UserList'
export default function configureRoutes() {
    return (
        <Route path='/admin/' component={App} name='Начальная страница'>
            <IndexRoute component={TextEditor} />
            <Route path='users' component={UserList} name='Участники' />
            <Redirect from='/*' to='/*/' />
        </Route>
    )
}
