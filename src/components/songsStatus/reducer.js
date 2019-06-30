import { FETCH_SONGS, ERROR } from './actionsTypes'

const initialState = {
  shouldShowLoader: true,
  errorOccured: false,
  errorMessage: '',
  songs: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SONGS:
      return {
        ...state,
        shouldShowLoader: false,
        songs: action.payload
      }
    case ERROR:
      return {
        ...state,
        errorOccured: true,
        errorMessage: action.payload,
        shouldShowLoader: false
      }
    default:
      return state
  }
}
