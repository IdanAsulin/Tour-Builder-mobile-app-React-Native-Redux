import { combineReducers } from 'redux'
import signUpReducer from './components/signUp/reducer'
import homeReducer from './components/home/reducer'
import signInReducer from './components/signIn/reducer'
import songsSelectionReducer from './components/songsSelection/reducer'
import countrySelectionReducer from './components/countrySelection/reducer'
import statusPageReducer from './components/statusPage/reducer'
import countryStatusReducer from './components/countryStatus/reducer'
import songsStatusReducer from './components/songsStatus/reducer'

export default combineReducers({
  signUp: signUpReducer,
  signIn: signInReducer,
  home: homeReducer,
  songsSelection: songsSelectionReducer,
  countrySelection: countrySelectionReducer,
  statusPage: statusPageReducer,
  countryStatus: countryStatusReducer,
  songsStatus: songsStatusReducer
})
