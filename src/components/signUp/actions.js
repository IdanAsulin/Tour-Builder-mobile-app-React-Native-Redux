import {
  NAME_CHANGED,
  MAIL_CHANGED,
  PASSWORD_CHANGED,
  GOOGLE_SIGN_IN,
  RESET_PARAMETERS
} from './actionsTypes'

export const handleChangeName = text => ({ type: NAME_CHANGED, payload: text })
export const handleChangeMail = text => ({ type: MAIL_CHANGED, payload: text })
export const handleChangePassword = text => ({ type: PASSWORD_CHANGED, payload: text })
export const handleGoogleSignin = sessionID => ({ type: GOOGLE_SIGN_IN, payload: sessionID })
export const handleResetParameters = () => ({ type: RESET_PARAMETERS, payload: null })

export const changeName = text => dispatch => {
  dispatch(handleChangeName(text))
}

export const changeMail = text => dispatch => {
  dispatch(handleChangeMail(text))
}

export const changePassword = text => dispatch => {
  dispatch(handleChangePassword(text))
}

export const resetParameters = () => dispatch => {
  dispatch(handleResetParameters())
}

export const googleSignin = sessionID => dispatch => {
  dispatch(handleGoogleSignin(sessionID))
}
