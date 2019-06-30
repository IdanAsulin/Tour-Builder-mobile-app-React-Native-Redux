import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  Picker
} from 'react-native'
import { fetchCountries, countryPick, getLocation, activateLocationLoader } from './actions'
import { connect } from 'react-redux'
import { MANAGER_ACCESS_TOKEN } from '../../../config'
import PropTypes from 'prop-types'

const mapStateToProps = state => ({
  selectedCountry: state.countrySelection.selectedCountry,
  countries: state.countrySelection.countries,
  shuldSowLoader: state.countrySelection.shuldSowLoader,
  errorOccured: state.countrySelection.errorOccured,
  errorMessage: state.countrySelection.errorMessage,
  shuldSowLocationLoader: state.countrySelection.shuldSowLocationLoader,
  songsList: state.songsSelection.selectedSongs,
  isGoogleUser: state.signUp.isGoogleUser,
  googleUserSessionID: state.signUp.googleUserSessionID,
  sessionID: state.signIn.sessionID,
  selectedArtist: state.home.selectedArtist
})

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#181818',
    height: '100%',
    flex: 1,
    alignItems: 'center'
  },
  loader: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.185,
    width: 50,
    height: 50,
    opacity: 0.5
  },
  locationLoader: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.49,
    width: 30,
    height: 30,
    opacity: 0.5
  },
  doneLoader: {
    width: 38,
    height: 38,
    opacity: 0.5
  },
  sentence: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Light',
    fontSize: 22,
    top: Dimensions.get('window').height * 0.02
  },
  secondSentence: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Light',
    fontSize: 19,
    top: Dimensions.get('window').height * 0.06
  },
  button: {
    backgroundColor: '#60685d',
    width: Dimensions.get('window').width * 0.63,
    height: Dimensions.get('window').height * 0.055,
    borderRadius: 9,
    top: Dimensions.get('window').height * 0.145,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Regular',
    fontSize: 19
  },
  picker: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    top: Dimensions.get('window').height * 0.05,
    borderColor: 'rgba(80,95,53,0.35)',
    borderBottomWidth: 0.2,
    borderTopWidth: 0.3
  },
  pickerItem: {
    color: '#f2f0f1',
    height: Dimensions.get('window').height * 0.3,
    fontFamily: 'Lato-Regular',
    fontSize: 24
  },
  tabNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(80,95,53,0.85)',
    borderTopWidth: 0.3,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.11
  },
  tabIcons: {
    width: Dimensions.get('window').width * 0.08,
    height: Dimensions.get('window').height * 0.04
  },
  tabText: {
    fontFamily: 'Lato-Regular',
    fontSize: 17,
    marginTop: 2,
    color: '#f2f0f1'
  },
  tabButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Dimensions.get('window').height * 0.02
  },
  homeButton: {
    marginRight: Dimensions.get('window').width * 0.35
  },
  artistImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.25
  },
  locationButton: {
    backgroundColor: '#f2f0f1',
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').height * 0.045,
    top: Dimensions.get('window').height * 0.075,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  locationText: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: '#181818',
    marginLeft: Dimensions.get('window').width * 0.02
  },
  locationIcon: {
    position: 'absolute',
    left: Dimensions.get('window').width * 0.02,
    top: Dimensions.get('window').height * 0.003,
    width: Dimensions.get('window').width * 0.05,
    height: Dimensions.get('window').height * 0.03
  }
})

class CountrySelection extends React.Component {
  static navigationOptions = props => {
    const { navigation } = props
    const { state } = navigation
    const { params } = state
    return {
      title: 'Vote now !',
      headerTitleStyle: {
        fontFamily: 'Lato-Light',
        fontSize: 43,
        width: Dimensions.get('window').width,
        bottom: Dimensions.get('window').height * 0.01
      },
      headerStyle: {
        backgroundColor: '#181818',
        borderBottomWidth: 0,
        height: Dimensions.get('window').height * 0.2
      },
      headerLeftContainerStyle: {
        top: Dimensions.get('window').height * -0.17
      },
      headerTintColor: '#f2f0f1',
      headerBackTitle: 'Back',
      headerBackground: params ? (
        <Image source={params.artistImage} style={styles.artistImage} />
      ) : null
    }
  }

  constructor(props) {
    super(props)
    this.handleDone = this.handleDone.bind(this)
    this.handleCountryPick = this.handleCountryPick.bind(this)
    this.handleStatusPress = this.handleStatusPress.bind(this)
    this.renderUI = this.renderUI.bind(this)
    this.renderLoader = this.renderLoader.bind(this)
    this.handleHomePress = this.handleHomePress.bind(this)
    this.handleGetLocation = this.handleGetLocation.bind(this)
    this.state = {
      shouldShowDoneLoader: false
    }
  }

  componentDidMount() {
    this.props.fetchCountries()
  }

  handleDone() {
    this.setState({ shouldShowDoneLoader: true })
    const songs = []
    for (const song of this.props.songsList) songs.push(song.spoti)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        managertoken: MANAGER_ACCESS_TOKEN
      },
      body: JSON.stringify({
        country: this.props.selectedCountry,
        songs: this.props.songsList,
        sessionID: this.props.isGoogleUser ? this.props.googleUserSessionID : this.props.sessionID
      })
    }
    const url = `https://tourbuilder1.herokuapp.com/vote/${this.props.selectedArtist}`
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        if (data.statusCode === 400) {
          this.setState({ shouldShowDoneLoader: false })
          Alert.alert(data.message)
          return
        }
        if (data.statusCode !== 200) {
          this.setState({ shouldShowDoneLoader: false })
          Alert.alert('Please try again in a few minutes')
          return
        }
        this.setState({ shouldShowDoneLoader: false })
        const { navigate } = this.props.navigation
        const { navigation } = this.props
        const { state } = navigation
        const { params } = state
        navigate({ routeName: 'SuccessPage', params: { artistImage: params.artistImage } })
      })
      .catch(() => {
        this.setState({ shouldShowDoneLoader: false })
        Alert.alert('Please check your internet connection')
      })
  }

  handleCountryPick(country) {
    this.props.countryPick(country)
  }

  handleGetLocation() {
    this.props.activateLocationLoader()
    this.props.getLocation()
  }

  handleHomePress() {
    const { navigate } = this.props.navigation
    navigate('Home')
  }

  handleStatusPress() {
    const { navigate } = this.props.navigation
    navigate('StatusPage')
  }

  renderUI() {
    if (this.props.errorOccured) Alert.alert(this.props.errorMessage)
    this.props.countries.sort((a, b) => {
      return ('' + a.name).localeCompare(b.name)
    })
    const pickerItems = this.props.countries.map((country, index) => {
      return <Picker.Item key={index} label={country.name} value={country.alpha2Code} />
    })
    return (
      <View style={styles.background}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.sentence}>Your favorite show location...</Text>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={this.handleCountryPick}
          selectedValue={this.props.selectedCountry}
        >
          {pickerItems}
        </Picker>
        <Text style={styles.secondSentence}>Or</Text>
        <TouchableOpacity style={styles.locationButton} onPress={this.handleGetLocation}>
          <Image source={require('../../../images/location.png')} style={styles.locationIcon} />
          <Text style={styles.locationText}>Use your location</Text>
        </TouchableOpacity>
        {this.props.shuldSowLocationLoader ? (
          <Image source={require('../../../images/loader.gif')} style={styles.locationLoader} />
        ) : null}
        <TouchableOpacity style={styles.button} onPress={this.handleDone}>
          <Text style={styles.buttonText}>
            {this.state.shouldShowDoneLoader ? (
              <Image source={require('../../../images/loader.gif')} style={styles.doneLoader} />
            ) : (
              'Done'
            )}
          </Text>
        </TouchableOpacity>
        <View style={styles.tabNavigation}>
          <TouchableOpacity
            style={[styles.tabButtonContainer, styles.homeButton]}
            onPress={this.handleHomePress}
          >
            <Image source={require('../../../images/home.png')} style={styles.tabIcons} />
            <Text style={styles.tabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButtonContainer} onPress={this.handleStatusPress}>
            <Image source={require('../../../images/graph.png')} style={styles.tabIcons} />
            <Text style={styles.tabText}>Status</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderLoader() {
    return (
      <View style={styles.background} pointerEvents="none">
        <StatusBar barStyle="light-content" />
        <Image source={require('../../../images/loader.gif')} style={styles.loader} />
        <Text style={styles.sentence}>Your favorite show location ...</Text>
        <Picker style={styles.picker} />
        <TouchableOpacity style={styles.button} onPress={this.handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <View style={styles.tabNavigation}>
          <TouchableOpacity style={[styles.tabButtonContainer, styles.homeButton]}>
            <Image
              source={require('../../../images/home.png')}
              style={styles.tabIcons}
              onPress={this.handleHomePress}
            />
            <Text style={styles.tabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButtonContainer} onPress={this.handleStatusPress}>
            <Image source={require('../../../images/graph.png')} style={styles.tabIcons} />
            <Text style={styles.tabText}>Status</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return this.props.shuldSowLoader ? this.renderLoader() : this.renderUI()
  }
}

CountrySelection.propTypes = {
  navigation: PropTypes.object,
  selectedCountry: PropTypes.string,
  countries: PropTypes.array,
  shuldSowLoader: PropTypes.bool,
  errorOccured: PropTypes.bool,
  errorMessage: PropTypes.string,
  fetchCountries: PropTypes.func,
  countryPick: PropTypes.func,
  getLocation: PropTypes.func,
  activateLocationLoader: PropTypes.func,
  shuldSowLocationLoader: PropTypes.bool,
  songsList: PropTypes.array,
  isGoogleUser: PropTypes.bool,
  googleUserSessionID: PropTypes.string,
  sessionID: PropTypes.string,
  selectedArtist: PropTypes.string
}

export default connect(
  mapStateToProps,
  { fetchCountries, countryPick, getLocation, activateLocationLoader }
)(CountrySelection)
