import { FETCH_SONGS, SELECT_SONG, UNSELECT_SONG, RESET_STATE, ERROR } from './actionsTypes'
import { MANAGER_ACCESS_TOKEN } from '../../../config'

export const handleFetchSongs = songs => ({ type: FETCH_SONGS, payload: songs })
export const handleSelectSong = song => ({ type: SELECT_SONG, payload: song })
export const handleUnSelectSong = song => ({ type: UNSELECT_SONG, payload: song })
export const handleResetState = () => ({ type: RESET_STATE, payload: null })
export const handleError = message => ({ type: ERROR, payload: message })

export const fetchSongs = artist => dispatch => {
  const url = `https://tourbuilder1.herokuapp.com/songs/${artist}`
  fetch(url, { headers: { managertoken: MANAGER_ACCESS_TOKEN } })
    .then(res => res.json())
    .then(response => {
      dispatch(handleFetchSongs(response.data))
    })
    .catch(err => {
      dispatch(handleError(err.message))
    })
}

export const selectSong = song => dispatch => {
  dispatch(handleSelectSong(song))
}

export const unSelectSong = song => dispatch => {
  dispatch(handleUnSelectSong(song))
}

export const resetState = () => dispatch => {
  dispatch(handleResetState())
}
