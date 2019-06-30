import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../src/rootReducer'

const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const initialState = {}

import homeReducer from '../src/components/home/reducer'

import signInReducer from '../src/components/signIn/reducer'

import signUpReducer from '../src/components/signUp/reducer'

import songsSelectionReducer from '../src/components/songsSelection/reducer'

import countrySelectionReducer from '../src/components/countrySelection/reducer'

import countryStatusReducer from '../src/components/countryStatus/reducer'

import songsStatusReducer from '../src/components/songsStatus/reducer'

import statusPageReducer from '../src/components/statusPage/reducer'

describe('HomeScreen reducer testing', () => {
  it('should return the correct state', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(homeReducer(initialState, { type: 'SOME_ACTION', payload: {} })).toEqual(initialState)
    expect(store.getState().home).toHaveProperty('selectedArtist', '2CIMQHirSU0MQqyYHq0eOx')
    expect(store.getState().home).toHaveProperty('artists', [])
    expect(store.getState().home).toHaveProperty('errorOccured', false)
    expect(store.getState().home).toHaveProperty('errorMessage', '')
    expect(store.getState().home).toHaveProperty('shuldSowLoader', true)

    expect(homeReducer(initialState, { type: 'ARTIST_PICK', payload: '' })).toEqual({
      selectedArtist: ''
    })
    expect(homeReducer(initialState, { type: 'FETCH_ARTIST', payload: [] })).toEqual({
      artists: [],
      shuldSowLoader: false
    })
    expect(homeReducer(initialState, { type: 'ERROR', payload: '' })).toEqual({
      errorOccured: true,
      errorMessage: '',
      shuldSowLoader: false
    })
  })
})

describe('SignInScrren reducer testing', () => {
  it('should return the correct state', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(signInReducer(initialState, { type: 'SOME_ACTION', payload: {} })).toEqual(initialState)
    expect(store.getState().signUp).toHaveProperty('email', '')
    expect(store.getState().signUp).toHaveProperty('password', '')
    expect(signInReducer(initialState, { type: 'MAIL_CHANGED', payload: 'a@a.com' })).toEqual({
      email: 'a@a.com'
    })
    expect(signInReducer(initialState, { type: 'PASSWORD_CHANGED', payload: 'fafafa' })).toEqual({
      password: 'fafafa'
    })
    expect(signInReducer(initialState, { type: 'RESET_PARAMETERS', payload: {} })).toEqual({
      password: '',
      email: ''
    })
  })
})

describe('SignUpScrren reducer testing', () => {
  it('should return the correct state', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(signUpReducer(initialState, { type: 'SOME_ACTION', payload: {} })).toEqual(initialState)
    expect(store.getState().signUp).toHaveProperty('fullName', '')
    expect(store.getState().signUp).toHaveProperty('email', '')
    expect(store.getState().signUp).toHaveProperty('password', '')
    expect(store.getState().signUp).toHaveProperty('isGoogleUser', false)
    expect(store.getState().signUp).toHaveProperty('googleUserSessionID', '')
    expect(signUpReducer(initialState, { type: 'NAME_CHANGED', payload: '' })).toEqual({
      fullName: ''
    })
    expect(signUpReducer(initialState, { type: 'MAIL_CHANGED', payload: '' })).toEqual({
      email: ''
    })
    expect(signUpReducer(initialState, { type: 'PASSWORD_CHANGED', payload: '' })).toEqual({
      password: ''
    })
    expect(signUpReducer(initialState, { type: 'GOOGLE_SIGN_IN', payload: '' })).toEqual({
      isGoogleUser: true,
      googleUserSessionID: ''
    })
    expect(signUpReducer(initialState, { type: 'RESET_PARAMETERS', payload: {} })).toEqual({
      fullName: '',
      password: '',
      email: ''
    })
  })
})

describe('SongsSelectionScrren reducer testing', () => {
  it('should return the correct state', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(songsSelectionReducer(initialState, { type: 'SOME_ACTION', payload: {} })).toEqual(
      initialState
    )
    expect(store.getState().songsSelection).toHaveProperty('songs', [])
    expect(store.getState().songsSelection).toHaveProperty('selectedSongs', [])
    expect(store.getState().songsSelection).toHaveProperty('shouldShowLoader', true)
    expect(store.getState().songsSelection).toHaveProperty('errorOccured', false)
    expect(store.getState().songsSelection).toHaveProperty('errorMessage', '')

    expect(songsSelectionReducer(initialState, { type: 'FETCH_SONGS', payload: [] })).toEqual({
      shouldShowLoader: false,
      songs: []
    })
    expect(songsSelectionReducer(initialState, { type: 'RESET_STATE', payload: {} })).toEqual({
      selectedSongs: [],
      shouldShowLoader: true
    })
    expect(songsSelectionReducer(initialState, { type: 'ERROR', payload: '' })).toEqual({
      errorOccured: true,
      errorMessage: '',
      shouldShowLoader: false
    })
  })
})

describe('CountrySelectionScrren reducer testing', () => {
  it('should return the correct state', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(countrySelectionReducer(initialState, { type: 'SOME_ACTION', payload: {} })).toEqual(
      initialState
    )
    expect(store.getState().countrySelection).toHaveProperty('selectedCountry', 'FR')
    expect(store.getState().countrySelection).toHaveProperty('countries', [])
    expect(store.getState().countrySelection).toHaveProperty('shuldSowLoader', true)
    expect(store.getState().countrySelection).toHaveProperty('shuldSowLocationLoader', false)
    expect(store.getState().countrySelection).toHaveProperty('errorOccured', false)
    expect(store.getState().countrySelection).toHaveProperty('errorMessage', '')
    expect(countrySelectionReducer(initialState, { type: 'COUNTRY_PICK', payload: '' })).toEqual({
      selectedCountry: ''
    })
    expect(countrySelectionReducer(initialState, { type: 'FETCH_COUNTRIES', payload: [] })).toEqual(
      {
        countries: [],
        shuldSowLoader: false
      }
    )
    expect(countrySelectionReducer(initialState, { type: 'GET_LOCATION', payload: '' })).toEqual({
      selectedCountry: '',
      shuldSowLocationLoader: false
    })
    expect(
      countrySelectionReducer(initialState, { type: 'ACTIVATE_LOCATION_LOADER', payload: {} })
    ).toEqual({
      shuldSowLocationLoader: true
    })
    expect(countrySelectionReducer(initialState, { type: 'ERROR', payload: '' })).toEqual({
      errorOccured: true,
      errorMessage: '',
      shuldSowLoader: false
    })
  })
})

describe('StatusPageScrren reducer testing', () => {
  it('should return the correct state', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(statusPageReducer(initialState, { type: 'SOME_ACTION', payload: {} })).toEqual(
      initialState
    )
    expect(store.getState().statusPage).toHaveProperty('selectedArtist', '2CIMQHirSU0MQqyYHq0eOx')
    expect(store.getState().statusPage).toHaveProperty('artists', [])
    expect(store.getState().statusPage).toHaveProperty('errorOccured', false)
    expect(store.getState().statusPage).toHaveProperty('errorMessage', '')
    expect(store.getState().statusPage).toHaveProperty('shuldSowLoader', true)
    expect(statusPageReducer(initialState, { type: 'ARTIST_PICK', payload: '' })).toEqual({
      selectedArtist: ''
    })
    expect(statusPageReducer(initialState, { type: 'FETCH_ARTIST', payload: [] })).toEqual({
      artists: [],
      shuldSowLoader: false
    })
    expect(statusPageReducer(initialState, { type: 'ERROR', payload: '' })).toEqual({
      errorOccured: true,
      errorMessage: '',
      shuldSowLoader: false
    })
  })
})

describe('songsStatus reducer testing', () => {
  it('should return the correct state', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(songsStatusReducer(initialState, { type: 'SOME_ACTION', payload: {} })).toEqual(
      initialState
    )
    expect(store.getState().songsStatus).toHaveProperty('songs', [])
    expect(store.getState().songsStatus).toHaveProperty('shouldShowLoader', true)
    expect(store.getState().songsStatus).toHaveProperty('errorOccured', false)
    expect(store.getState().songsStatus).toHaveProperty('errorMessage', '')
    expect(songsStatusReducer(initialState, { type: 'FETCH_SONGS', payload: [] })).toEqual({
      shouldShowLoader: false,
      songs: []
    })
    expect(songsStatusReducer(initialState, { type: 'ERROR', payload: '' })).toEqual({
      errorOccured: true,
      errorMessage: '',
      shouldShowLoader: false
    })
  })
})

describe('CountryStatus reducer testing', () => {
  it('should return the correct state', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(countryStatusReducer(initialState, { type: 'SOME_ACTION', payload: {} })).toEqual(
      initialState
    )
    expect(store.getState().countryStatus).toHaveProperty('selectedCountry', '')
    expect(store.getState().countryStatus).toHaveProperty('countries', null)
    expect(store.getState().countryStatus).toHaveProperty('shuldSowLoader', true)
    expect(store.getState().countryStatus).toHaveProperty('errorOccured', false)
    expect(store.getState().countryStatus).toHaveProperty('errorMessage', '')
    expect(store.getState().countryStatus).toHaveProperty('isArtistFound', true)

    expect(
      countryStatusReducer(initialState, { type: 'FETCH_TOP_COUNTRIES', payload: [] })
    ).toEqual({
      shuldSowLoader: false,
      countries: [],
      isArtistFound: true
    })
    expect(countryStatusReducer(initialState, { type: 'ARTIST_NOT_FOUND', payload: {} })).toEqual({
      isArtistFound: false,
      shuldSowLoader: false
    })
    expect(countryStatusReducer(initialState, { type: 'COUNTRY_SELECT', payload: '' })).toEqual({
      selectedCountry: ''
    })

    expect(countryStatusReducer(initialState, { type: 'ERROR', payload: '' })).toEqual({
      errorOccured: true,
      errorMessage: '',
      shuldSowLoader: false
    })
  })
})
