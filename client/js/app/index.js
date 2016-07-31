require('babel-polyfill')

//import preloadCss from './libs/preloadCSS'

//preloadCss()

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store'
import configureRoutes from './routes'

import ReducerRegistry from './libs/ReducerRegistry'
import coreReducers from './reducers/core'
import DevTools from './libs/DevTools'

const reducerRegistry = new ReducerRegistry(coreReducers)

if (module.hot) {
    module.hot.accept('./reducers/core', () => {
        const nextCoreReducers = require('./reducers/core')
        reducerRegistry.register(nextCoreReducers)
    })
}

const routes = configureRoutes(reducerRegistry)
const store = configureStore(reducerRegistry)


render(
    <div>
        <Provider store={store}>
            <div>
                <Router
                    routes={routes}
                    history={syncHistoryWithStore(browserHistory, store)}
                />
                {process.env.NODE_ENV !== 'production' ? <DevTools /> : null}
            </div>
        </Provider>
    </div>,
    document.querySelector('#app')
)
