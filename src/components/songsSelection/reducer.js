import { FETCH_SONGS, SELECT_SONG, UNSELECT_SONG, RESET_STATE, ERROR } from './actionsTypes'

const initialState = {
  songs: [],
  selectedSongs: [],
  shouldShowLoader: true,
  errorOccured: false,
  errorMessage: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SONGS:
      return {
        ...state,
        shouldShowLoader: false,
        songs: action.payload
      }
    case SELECT_SONG:
      return {
        ...state,
        selectedSongs: [...state.selectedSongs, action.payload]
      }
    case UNSELECT_SONG:
      return {
        ...state,
        selectedSongs: state.selectedSongs.filter(
          song => song.songSpotifyID !== action.payload.songSpotifyID
        )
      }
    case RESET_STATE:
      return {
        ...state,
        selectedSongs: [],
        shouldShowLoader: true
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
