import {
    USERS_LOADING_START,
    USERS_LOADING_END,
    USERS_GET
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
