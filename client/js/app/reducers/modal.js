import { MODAL_OPEN, MODAL_CLOSE } from '../constants/modal'

export default (state = false, action) => {

    switch (action.type) {
    case MODAL_OPEN:
        return action.value
    case MODAL_CLOSE:
        return false
    default:
        return state
    }
}
