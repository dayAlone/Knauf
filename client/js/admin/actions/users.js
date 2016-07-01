import {
    USERS_LOADING_START,
    USERS_LOADING_END,
    USERS_GET,
    USERS_PAGE_SET,
    USERS_SORT_SET,
    USERS_LIMIT_SET
} from '../constants/users'


import 'whatwg-fetch'


export function getUsers() {
    return (dispatch) => {
        dispatch({
            type: USERS_LOADING_START
        })
        fetch('/admin/users/get/',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: USERS_LOADING_END
                })
                dispatch({
                    type: USERS_GET,
                    value: response
                })
            })
    }
}

export function setPage(page) {
    return (dispatch) => {
        dispatch({
            type: USERS_PAGE_SET,
            value: page
        })
    }
}

export function setSort(sortBy, sort) {
    return (dispatch) => {
        dispatch({
            type: USERS_SORT_SET,
            sortBy,
            sort
        })
    }
}

export function setLimit(limit) {
    return (dispatch) => {
        dispatch({
            type: USERS_LIMIT_SET,
            limit
        })
    }
}
