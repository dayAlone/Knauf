import {
    TEXTS_UPDATE_TEXT,
    TEXTS_SEARCH_SET,
    TEXTS_TAB_SET,
    TEXTS_SAVING_START,
    TEXTS_SAVING_END,
    TEXTS_CHANGE_SET,
    TEXTS_CHANGE_REMOVE,
    TEXTS_CHANGES_RESET } from '../constants/texts'


import 'whatwg-fetch'


export function updateTexts(value) {
    return (dispatch) => {
        dispatch({
            type: TEXTS_UPDATE_TEXT,
            value
        })
    }
}

export function setTab(value) {
    return (dispatch) => {
        dispatch({
            type: TEXTS_TAB_SET,
            value
        })
    }
}

export function setSearch(value) {
    return (dispatch) => {
        dispatch({
            type: TEXTS_SEARCH_SET,
            value
        })
    }
}


export function startSaving(value) {
    return (dispatch) => {
        dispatch({
            type: TEXTS_SAVING_START
        })
        fetch('/admin/save/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            }).then((response) => {
                response
                    .json()
                    .then((responseText) => {
                        dispatch({
                            type: TEXTS_SAVING_END
                        })
                        dispatch({
                            type: TEXTS_UPDATE_TEXT,
                            value: responseText
                        })
                        dispatch({
                            type: TEXTS_CHANGES_RESET
                        })
                    })
            })
    }
}

export function endSaving(value) {
    return (dispatch) => {
        dispatch({
            type: TEXTS_SAVING_END,
            value
        })
    }
}


export function setChange(code, value) {
    return (dispatch) => {
        dispatch({
            type: TEXTS_CHANGE_SET,
            code,
            value
        })
    }
}

export function removeChange(code) {
    return (dispatch) => {
        dispatch({
            type: TEXTS_CHANGE_REMOVE,
            code
        })
    }
}

export function resetChanges() {
    return (dispatch) => {
        dispatch({
            type: TEXTS_CHANGES_RESET
        })
    }
}
