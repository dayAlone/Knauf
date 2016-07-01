import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import configureReducers from '../reducers'

import { merge } from 'lodash'

import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'

export default function configureStore(reducerRegistry) {
    const rootReducer = compose(
            mergePersistedState((initialState, persistedState) => merge({}, initialState, persistedState))
        )(configureReducers(reducerRegistry.getReducers()))

    const DevTools = require('../libs/DevTools')

    const storage = compose(
        filter(['texts.search', 'texts.tab', 'texts.changes', 'users.limit', 'users.sort', 'users.sortBy', 'users.page'])
    )(adapter(window.localStorage))

    const store = compose(
        applyMiddleware(thunkMiddleware),
        persistState(storage, 'admin-settings'),
        DevTools.instrument()
    )(createStore)(rootReducer)

    reducerRegistry.setChangeListener((reducers) => {
        store.replaceReducer(compose(mergePersistedState())(configureReducers(reducers)))
    })
    return store
}
