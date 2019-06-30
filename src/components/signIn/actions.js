import { MAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, RESET_PARAMETERS } from './actionsTypes'

export const handleChangeMail = text => ({ type: MAIL_CHANGED, payload: text })
export const handleChangePassword = text => ({ type: PASSWORD_CHANGED, payload: text })
export const handleResetParameters = () => ({ type: RESET_PARAMETERS, payload: null })
export const handleSuccessLogin = sessionID => ({ type: LOGIN_SUCCESS, payload: sessionID })

export const changeMail = text => dispatch => {
  dispatch(handleChangeMail(text))
}

export const changePassword = text => dispatch => {
  dispatch(handleChangePassword(text))
}

export const resetParameters = () => dispatch => {
  dispatch(handleResetParameters())
}

export const loginSuccess = sessionID => dispatch => {
  dispatch(handleSuccessLogin(sessionID))
}
