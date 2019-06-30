import { handleArtistPick, handleFetchArtists, handleError } from '../src/components/home/actions'

import {
  handleChangeMail,
  handleChangePassword,
  handleResetParameters,
  handleSuccessLogin
} from '../src/components/signIn/actions'

import { handleChangeName, handleGoogleSignin } from '../src/components/signUp/actions'

import {
  handleFetchSongs,
  handleSelectSong,
  handleUnSelectSong,
  handleResetState
} from '../src/components/songsSelection/actions'

import {
  handleFetchCountries,
  handleCountryPick,
  handleGetLocation,
  handleActivateLocationLoader
} from '../src/components/countrySelection/actions'

import {
  handleFetchTopCountries,
  handleArtistNotFound,
  handleSelectCountry
} from '../src/components/countryStatus/actions'

describe('HomeScreen Actions', () => {
  it('should create an action with correct type', () => {
    expect(handleArtistPick({}).type).toEqual('ARTIST_PICK')
    expect(handleArtistPick().payload).toEqual()
    expect(handleFetchArtists({}).type).toEqual('FETCH_ARTIST')
    expect(handleFetchArtists().payload).toEqual()
    expect(handleError().type).toEqual('ERROR')
    expect(handleError().payload).toEqual()
  })
})

describe('SignInScrren Actions', () => {
  it('should create an action with correct type', () => {
    expect(handleChangeMail('').type).toEqual('MAIL_CHANGED')
    expect(handleChangeMail('the mail changed').payload).toEqual('the mail changed')
    expect(handleChangePassword('').type).toEqual('PASSWORD_CHANGED')
    expect(handleChangePassword('new password').payload).toEqual('new password')
    expect(handleResetParameters().type).toEqual('RESET_PARAMETERS')
    expect(handleResetParameters().payload).toEqual(null)
    expect(handleSuccessLogin().type).toEqual('LOGIN_SUCCESS')
  })
})

describe('SongsSelectionScrren Actions', () => {
  it('should create an action with correct type', () => {
    expect(handleFetchSongs({}).type).toEqual('FETCH_SONGS')
    expect(handleFetchSongs([]).payload).toEqual([])
    expect(handleSelectSong({}).type).toEqual('SELECT_SONG')
    expect(handleSelectSong().payload).toEqual()
    expect(handleUnSelectSong({}).type).toEqual('UNSELECT_SONG')
    expect(handleUnSelectSong().payload).toEqual()
    expect(handleResetState({}).type).toEqual('RESET_STATE')
    expect(handleResetState().payload).toEqual(null)
    expect(handleError({}).type).toEqual('ERROR')
    expect(handleError('').payload).toEqual('')
  })
})

describe('SignUpScrren Actions', () => {
  it('should create an action with correct type', () => {
    expect(handleChangeName('').type).toEqual('NAME_CHANGED')
    expect(handleChangeName('the name changed').payload).toEqual('the name changed')
    expect(handleChangeMail('').type).toEqual('MAIL_CHANGED')
    expect(handleChangeMail('the mail changed').payload).toEqual('the mail changed')
    expect(handleChangePassword('').type).toEqual('PASSWORD_CHANGED')
    expect(handleChangePassword('new password').payload).toEqual('new password')
    expect(handleGoogleSignin('').type).toEqual('GOOGLE_SIGN_IN')
    expect(handleResetParameters({}).type).toEqual('RESET_PARAMETERS')
    expect(handleResetParameters().payload).toEqual(null)
  })
})

describe('CountrySelectionScrren Actions', () => {
  it('should create an action with correct type', () => {
    expect(handleFetchCountries({}).type).toEqual('FETCH_COUNTRIES')
    expect(handleFetchCountries([]).payload).toEqual([])
    expect(handleError({}).type).toEqual('ERROR')
    expect(handleError('').payload).toEqual('')
    expect(handleCountryPick({}).type).toEqual('COUNTRY_PICK')
    expect(handleCountryPick('').payload).toEqual('')
    expect(handleGetLocation({}).type).toEqual('GET_LOCATION')
    expect(handleGetLocation().payload).toEqual()
    expect(handleActivateLocationLoader({}).type).toEqual('ACTIVATE_LOCATION_LOADER')
    expect(handleActivateLocationLoader().payload).toEqual(null)
  })
})

describe('CountryStatus Actions', () => {
  it('should create an action with correct type', () => {
    expect(handleError({}).type).toEqual('ERROR')
    expect(handleError('').payload).toEqual('')
    expect(handleFetchTopCountries({}).type).toEqual('FETCH_TOP_COUNTRIES')
    expect(handleFetchTopCountries('').payload).toEqual('')
    expect(handleArtistNotFound({}).type).toEqual('ARTIST_NOT_FOUND')
    expect(handleArtistNotFound().payload).toEqual(null)
    expect(handleSelectCountry({}).type).toEqual('COUNTRY_SELECT')
    expect(handleSelectCountry('').payload).toEqual('')
  })
})

describe('songsStatus Actions', () => {
  it('should create an action with correct type', () => {
    expect(handleError({}).type).toEqual('ERROR')
    expect(handleError('').payload).toEqual('')
    expect(handleFetchSongs({}).type).toEqual('FETCH_SONGS')
    expect(handleFetchSongs([]).payload).toEqual([])
  })
})

describe('statusPageScreen Actions', () => {
  it('should create an action with correct type', () => {
    expect(handleError({}).type).toEqual('ERROR')
    expect(handleError('').payload).toEqual('')
    expect(handleArtistPick({}).type).toEqual('ARTIST_PICK')
    expect(handleArtistPick().payload).toEqual()
    expect(handleFetchArtists({}).type).toEqual('FETCH_ARTIST')
    expect(handleFetchArtists().payload).toEqual()
  })
})
