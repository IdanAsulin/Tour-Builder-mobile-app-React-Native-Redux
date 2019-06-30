import { ERROR, FETCH_TOP_COUNTRIES, ARTIST_NOT_FOUND, COUNTRY_SELECT } from './actionsTypes'
import { MANAGER_ACCESS_TOKEN } from '../../../config'

export const handleError = message => ({ type: ERROR, payload: message })
export const handleFetchTopCountries = countries => ({
  type: FETCH_TOP_COUNTRIES,
  payload: countries
})
export const handleArtistNotFound = () => ({ type: ARTIST_NOT_FOUND, payload: null })
export const handleSelectCountry = country => ({ type: COUNTRY_SELECT, payload: country })

export const fetchTopCountries = artist => dispatch => {
  const url = `https://tourbuilder1.herokuapp.com/topCountries/${artist}`
  fetch(url, { headers: { managertoken: MANAGER_ACCESS_TOKEN } })
    .then(res => res.json())
    .then(response => {
      if (response.statusCode !== 200) {
        dispatch(handleArtistNotFound())
        return
      }
      dispatch(handleFetchTopCountries(response.data))
    })
    .catch(err => {
      dispatch(handleError(err.message))
    })
}

export const selectCountry = country => dispatch => {
  dispatch(handleSelectCountry(country))
}
