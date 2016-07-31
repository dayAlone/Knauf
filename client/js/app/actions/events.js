import { EVENT_REACH } from '../constants/events'

export function reachEvent(event, category = 'user_behavior', uniq = true) {
    return (dispatch) => {
        dispatch({
            type: EVENT_REACH,
            event,
            category,
            uniq
        })
    }
}
