import counter from '../libs/counters'
import { EVENT_REACH } from '../constants/events'

export default (state = [], action) => {
    const { type, event, uniq = true, category = 'user_behaviour' } = action

    switch (type) {
    case EVENT_REACH:
        if (uniq && state.indexOf(event) === -1 || !uniq) {
            counter.setGoal(event, category)
            return [
                ...state,
                event
            ]
        }
        return state
    default:
        return state
    }
}
