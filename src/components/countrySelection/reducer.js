import {
  FETCH_COUNTRIES,
  ERROR,
  COUNTRY_PICK,
  GET_LOCATION,
  ACTIVATE_LOCATION_LOADER
} from './actionsTypes'

const initialState = {
  selectedCountry: 'FR',
  countries: [],
  shuldSowLoader: true,
  shuldSowLocationLoader: false,
  errorOccured: false,
  errorMessage: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case COUNTRY_PICK:
      return {
        ...state,
        selectedCountry: action.payload
      }
    case FETCH_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        shuldSowLoader: false
      }
    case GET_LOCATION:
      return {
        ...state,
        selectedCountry: action.payload,
        shuldSowLocationLoader: false
      }
    case ACTIVATE_LOCATION_LOADER:
      return {
        ...state,
        shuldSowLocationLoader: true
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
