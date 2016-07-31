import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import configureReducers from '../reducers'

import merge from 'lodash/merge'

import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'

const additional = process.env.NODE_ENV === 'production' ? ['user'] : []

export default function configureStore(reducerRegistry) {
    const rootReducer = compose(
            mergePersistedState((initialState, persistedState) => merge({}, initialState, persistedState))
        )(configureReducers(reducerRegistry.getReducers()))

    const DevTools = require('../libs/DevTools')

    const storage = compose(
        filter(
            [...additional]
        )
    )(adapter(window.localStorage))


    const store = compose(
        applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory)),
        persistState(storage, 'app-state'),
        DevTools.instrument()
    )(createStore)(rootReducer)

    reducerRegistry.setChangeListener((reducers) => {
        store.replaceReducer(compose(mergePersistedState())(configureReducers(reducers)))
    })
    return store
}
