import { ARTIST_PICK, FETCH_ARTIST, ERROR } from './actionsTypes'
import { MANAGER_ACCESS_TOKEN } from '../../../config'

export const handleArtistPick = artist => ({ type: ARTIST_PICK, payload: artist })
export const handleFetchArtists = artists => ({ type: FETCH_ARTIST, payload: artists })
export const handleError = message => ({ type: ERROR, payload: message })

export const artistPick = artist => dispatch => {
  dispatch(handleArtistPick(artist))
}

export const fetchArtists = () => dispatch => {
  const url = 'https://tourbuilder1.herokuapp.com/artists'
  fetch(url, { headers: { managertoken: MANAGER_ACCESS_TOKEN } })
    .then(res => res.json())
    .then(response => {
      dispatch(handleFetchArtists(response.data))
    })
    .catch(err => {
      dispatch(handleError(err.message))
    })
}
