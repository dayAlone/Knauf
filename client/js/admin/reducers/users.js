import {
    USERS_LOADING_START,
    USERS_LOADING_END,
    USERS_GET
} from '../constants/users'

const initialState = {
    values: [],
    loading: true,
    page: 0,
    sort: 'id',
    search: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
    case USERS_LOADING_START:
        return {
            ...state,
            loading: true
        }
    case USERS_LOADING_END:
        return {
            ...state,
            loading: false
        }
    case USERS_GET:
        return {
            ...state,
            values: action.value
        }
    default:
        return state
    }
}
