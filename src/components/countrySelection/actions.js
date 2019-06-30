import {
  FETCH_COUNTRIES,
  ERROR,
  COUNTRY_PICK,
  GET_LOCATION,
  ACTIVATE_LOCATION_LOADER
} from './actionsTypes'
import { OPENCAGE_API_KEY } from '../../../config'

export const handleFetchCountries = countries => ({ type: FETCH_COUNTRIES, payload: countries })
export const handleError = message => ({ type: ERROR, payload: message })
export const handleCountryPick = country => ({ type: COUNTRY_PICK, payload: country })
export const handleGetLocation = location => ({ type: GET_LOCATION, payload: location })
export const handleActivateLocationLoader = () => ({
  type: ACTIVATE_LOCATION_LOADER,
  payload: null
})

export const fetchCountries = () => dispatch => {
  const url = 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;flag'
  fetch(url)
    .then(res => res.json())
    .then(response => {
      dispatch(handleFetchCountries(response))
    })
    .catch(err => {
      dispatch(handleError(err.message))
    })
}

export const countryPick = country => dispatch => {
  dispatch(handleCountryPick(country))
}

export const activateLocationLoader = () => dispatch => {
  dispatch(handleActivateLocationLoader())
}

export const getLocation = () => dispatch => {
  navigator.geolocation.getCurrentPosition(
    position => {
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}%2C${
          position.coords.longitude
        }&key=${OPENCAGE_API_KEY}&pretty=1`
      )
        .then(res => res.json())
        .then(data => {
          if (data.status.code !== 200) {
            dispatch(
              handleError(
                'Can not use device location, Please select a country from the above list'
              )
            )
            return
          }
          const countryName = data.results[0].components.country
          fetch(`https://restcountries.eu/rest/v2/name/${countryName}?fields=name;alpha2Code;flag`)
            .then(res => res.json())
            .then(data => {
              dispatch(handleGetLocation(data[0].alpha2Code))
            })
            .catch(() =>
              dispatch(
                handleError(
                  'Can not use device location, Please select a country from the above list'
                )
              )
            )
        })
        .catch(() =>
          dispatch(
            handleError('Can not use device location, Please select a country from the above list')
          )
        )
    },
    () => {
      dispatch(
        handleError('Can not use device location, Please select a country from the above list')
      )
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  )
}
