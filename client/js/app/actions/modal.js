import { MODAL_OPEN, MODAL_CLOSE } from '../constants/modal'

export const openModal = (modal) => (
    dispatch => (
        dispatch({
            type: MODAL_OPEN,
            value: modal
        })
    )
)


export const closeModal = () => (
    dispatch => (
        dispatch({
            type: MODAL_CLOSE
        })
    )
)
