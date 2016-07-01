import {
    USERS_LOADING_START,
    USERS_LOADING_END,
    USERS_GET,
    USERS_PAGE_SET,
    USERS_SORT_SET,
    USERS_LIMIT_SET
} from '../constants/users'

const initialState = {
    values: [],
    loading: true,
    page: 0,
    limit: 10,
    sortBy: 'id',
    sort: -1,
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
    case USERS_PAGE_SET:
        return {
            ...state,
            page: action.value
        }
    case USERS_SORT_SET:
        return {
            ...state,
            sortBy: action.sortBy,
            sort: action.sort,
        }
    case USERS_LIMIT_SET:
        return {
            ...state,
            limit: action.limit,
        }
    default:
        return state
    }
}
