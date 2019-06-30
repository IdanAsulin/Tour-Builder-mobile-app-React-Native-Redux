import { ARTIST_PICK, FETCH_ARTIST, ERROR } from './actionsTypes'

const initialState = {
  selectedArtist: '2CIMQHirSU0MQqyYHq0eOx',
  artists: [],
  errorOccured: false,
  errorMessage: '',
  shuldSowLoader: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ARTIST_PICK:
      return {
        ...state,
        selectedArtist: action.payload
      }
    case FETCH_ARTIST:
      return {
        ...state,
        artists: action.payload,
        shuldSowLoader: false
      }
    case ERROR:
      return {
        ...state,
        errorOccured: true,
        errorMessage: action.payload,
        shuldSowLoader: false
      }
    default:
      return state
  }
}
