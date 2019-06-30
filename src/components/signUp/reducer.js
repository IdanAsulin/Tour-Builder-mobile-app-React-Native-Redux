import {
  NAME_CHANGED,
  MAIL_CHANGED,
  PASSWORD_CHANGED,
  GOOGLE_SIGN_IN,
  RESET_PARAMETERS
} from './actionsTypes'

const initialState = {
  fullName: '',
  email: '',
  password: '',
  isGoogleUser: false,
  googleUserSessionID: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NAME_CHANGED:
      return {
        ...state,
        fullName: action.payload
      }
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
    case GOOGLE_SIGN_IN:
      return {
        ...state,
        isGoogleUser: true,
        googleUserSessionID: action.payload
      }
    case RESET_PARAMETERS:
      return {
        ...state,
        fullName: '',
        password: '',
        email: ''
      }
    default:
      return state
  }
}
