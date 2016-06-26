import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export default function configureReducers(reducers) {
    return combineReducers({
        ...reducers,
        routing: routerReducer
    })
}
