import { MAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, RESET_PARAMETERS } from './actionsTypes'

const initialState = {
  email: '',
  password: '',
  sessionID: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MAIL_CHANGED:
      return {
        ...state,
        email: action.payload
      }
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload
      }
    case RESET_PARAMETERS:
      return {
        ...state,
        password: '',
        email: ''
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        sessionID: action.payload
      }
    default:
      return state
  }
}
