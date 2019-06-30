import { FETCH_SONGS, ERROR } from './actionsTypes'
import { MANAGER_ACCESS_TOKEN } from '../../../config'

export const handleFetchSongs = songs => ({ type: FETCH_SONGS, payload: songs })
export const handleError = message => ({ type: ERROR, payload: message })

export const fetchSongs = (artist, country) => dispatch => {
  const url = `https://tourbuilder1.herokuapp.com/topSongs/${artist}/${country}`
  fetch(url, { headers: { managertoken: MANAGER_ACCESS_TOKEN } })
    .then(res => res.json())
    .then(response => {
      if (response.statusCode !== 200) {
        dispatch(handleError(response.message))
        return
      }
      dispatch(handleFetchSongs(response.data))
    })
    .catch(err => {
      dispatch(handleError(err.message))
    })
}
