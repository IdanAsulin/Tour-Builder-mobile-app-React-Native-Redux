import { ERROR, FETCH_TOP_COUNTRIES, ARTIST_NOT_FOUND, COUNTRY_SELECT } from './actionsTypes'

const initialState = {
  shuldSowLoader: true,
  errorOccured: false,
  errorMessage: '',
  countries: null,
  isArtistFound: true,
  selectedCountry: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOP_COUNTRIES:
      return {
        ...state,
        shuldSowLoader: false,
        countries: action.payload,
        isArtistFound: true
      }
    case ARTIST_NOT_FOUND:
      return {
        ...state,
        isArtistFound: false,
        shuldSowLoader: false
      }
    case COUNTRY_SELECT:
      return {
        ...state,
        selectedCountry: action.payload
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
