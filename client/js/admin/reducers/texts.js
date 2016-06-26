import {
    TEXTS_UPDATE_TEXT,
    TEXTS_SEARCH_SET,
    TEXTS_TAB_SET,
    TEXTS_SAVING_START,
    TEXTS_SAVING_END,
    TEXTS_CHANGE_SET,
    TEXTS_CHANGE_REMOVE,
    TEXTS_CHANGES_RESET } from '../constants/texts'

const initialState = {
    values: window.texts,
    tab: 0,
    changes: {},
    search: false,
    saving: false
}

export default (state = initialState, action) => {
    switch (action.type) {
    case TEXTS_TAB_SET:
        return {
            ...state,
            tab: action.value
        }
    case TEXTS_UPDATE_TEXT:
        return {
            ...state,
            values: action.value
        }
    case TEXTS_SEARCH_SET:
        return {
            ...state,
            search: action.value && action.value.length > 0 ? action.value : false
        }
    case TEXTS_SAVING_START:
        return {
            ...state,
            saving: true
        }
    case TEXTS_SAVING_END:
        return {
            ...state,
            saving: false
        }
    case TEXTS_CHANGE_SET:
        state.changes[action.code] = action.value
        return {
            ...state,
            changes: state.changes
        }
    case TEXTS_CHANGE_REMOVE:
        delete state.changes[action.code]
        return {
            ...state,
            changes: state.changes
        }
    case TEXTS_CHANGES_RESET:
        return {
            ...state,
            changes: {}
        }

    default:
        return state
    }
}
