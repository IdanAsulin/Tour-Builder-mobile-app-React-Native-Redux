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
  Animated
} from 'react-native'
import { fetchTopCountries, selectCountry } from './actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
const countryCodeLookup = require('country-code-lookup')

const mapStateToProps = state => ({
  shuldSowLoader: state.countryStatus.shuldSowLoader,
  errorOccured: state.countryStatus.errorOccured,
  errorMessage: state.countryStatus.errorMessage,
  selectedArtist: state.statusPage.selectedArtist,
  countries: state.countryStatus.countries,
  isArtistFound: state.countryStatus.isArtistFound
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
  title: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Light',
    fontSize: 35,
    top: Dimensions.get('window').height * 0.02
  },
  sentence: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Light',
    fontSize: 22,
    textAlign: 'center',
    top: Dimensions.get('window').height * 0.03
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
  graphContainer: {
    width: Dimensions.get('window').width * 0.95,
    flexDirection: 'row',
    top: Dimensions.get('window').height * 0.05,
    justifyContent: 'center',
    transform: [{ rotate: '180deg' }]
  },
  graphColoumn: {
    marginLeft: Dimensions.get('window').width * 0.065,
    marginRight: Dimensions.get('window').width * 0.065,
    marginBottom: 5,
    borderRadius: 6,
    width: Dimensions.get('window').width * 0.08
  },
  result: {
    alignItems: 'center'
  },
  votes: {
    fontFamily: 'Lato-Regular',
    fontSize: 11,
    color: '#f2f0f1',
    transform: [{ rotate: '180deg' }]
  },
  songsButtonText: {
    fontFamily: 'Lato-Regular',
    fontSize: 17,
    color: '#f2f0f1',
    borderWidth: 1,
    borderColor: '#f2f0f1',
    borderRadius: 7,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.19,
    padding: 4,
    marginBottom: Dimensions.get('window').height * 0.04,
    transform: [{ rotate: '90deg' }]
  },
  songsButtonTextDisabled: {
    fontFamily: 'Lato-Regular',
    fontSize: 17,
    color: '#f2f0f1',
    borderWidth: 1,
    borderColor: '#f2f0f1',
    borderRadius: 7,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.19,
    padding: 4,
    marginBottom: Dimensions.get('window').height * 0.04,
    transform: [{ rotate: '90deg' }],
    opacity: 0.4
  }
})

class CountryStatus extends React.Component {
  static navigationOptions = props => {
    const { navigation } = props
    const { state } = navigation
    const { params } = state
    return {
      title: 'Status',
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
    this.handleStatusPress = this.handleStatusPress.bind(this)
    this.renderUI = this.renderUI.bind(this)
    this.renderLoader = this.renderLoader.bind(this)
    this.handleHomePress = this.handleHomePress.bind(this)
    this.handleSongsPress = this.handleSongsPress.bind(this)
    this.animateFirst = new Animated.Value(0)
    this.animateSecond = new Animated.Value(0)
    this.animateThird = new Animated.Value(0)
    this.animateFourth = new Animated.Value(0)
    this.animateOthers = new Animated.Value(0)
    this.graphStyle = {
      first: {
        backgroundColor: '#897e7e',
        height: this.animateFirst
      },
      second: {
        backgroundColor: '#60685d',
        height: this.animateSecond
      },
      third: {
        backgroundColor: '#897e7e',
        height: this.animateThird
      },
      fourth: {
        backgroundColor: '#505f35',
        height: this.animateFourth
      },
      others: {
        backgroundColor: '#f2f0f1',
        height: this.animateOthers
      }
    }
  }

  componentWillMount() {
    this.props.fetchTopCountries(this.props.selectedArtist)
  }

  handleHomePress() {
    const { navigate } = this.props.navigation
    navigate('Home')
  }

  handleStatusPress() {
    const { navigate } = this.props.navigation
    navigate('StatusPage')
  }

  handleSongsPress(country) {
    this.props.selectCountry(country)
    const { navigate } = this.props.navigation
    const { navigation } = this.props
    const { state } = navigation
    const { params } = state
    navigate({ routeName: 'SongsStatus', params: { artistImage: params.artistImage } })
  }

  renderUI() {
    if (!this.props.isArtistFound) {
      return (
        <View style={styles.background}>
          <StatusBar barStyle="light-content" />
          <Text style={styles.title}>Sorry</Text>
          <Text style={styles.sentence}>
            {`We didn't find any votes for that artist, You can be the first to do so`}
          </Text>
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
    if (this.props.errorOccured) {
      Alert.alert(this.props.errorMessage)
      return <View style={styles.background} />
    }
    let firstHeight = Dimensions.get('window').height * 0.36
    let secondHeight = Dimensions.get('window').height * 0.36
    let thirdHeight = Dimensions.get('window').height * 0.36
    let fourhHeight = Dimensions.get('window').height * 0.36
    let othersHeight = Dimensions.get('window').height * 0.36
    this.props.countries
      ? (firstHeight *= this.props.countries.first.votes / 100)
      : (firstHeight = 0)
    this.props.countries
      ? (secondHeight *= this.props.countries.second.votes / 100)
      : (secondHeight = 0)
    this.props.countries
      ? (thirdHeight *= this.props.countries.third.votes / 100)
      : (thirdHeight = 0)
    this.props.countries
      ? (fourhHeight *= this.props.countries.fourth.votes / 100)
      : (fourhHeight = 0)
    this.props.countries
      ? (othersHeight *= this.props.countries.others.votes / 100)
      : (othersHeight = 0)
    if (firstHeight * 2.2 <= Dimensions.get('window').height * 0.36) firstHeight *= 2.2
    if (
      secondHeight * 2.2 <= Dimensions.get('window').height * 0.36 &&
      secondHeight * 2.2 <= firstHeight
    )
      secondHeight *= 2.2
    if (
      thirdHeight * 2.2 <= Dimensions.get('window').height * 0.36 &&
      thirdHeight * 2.2 <= secondHeight
    )
      thirdHeight *= 2.2
    if (
      fourhHeight * 2.2 <= Dimensions.get('window').height * 0.36 &&
      fourhHeight * 2.2 <= thirdHeight
    )
      fourhHeight *= 2.2
    if (othersHeight * 2.2 <= Dimensions.get('window').height * 0.36) othersHeight *= 2.2
    Animated.parallel([
      Animated.timing(this.animateFirst, {
        toValue: firstHeight,
        duration: 2500
      }),
      Animated.timing(this.animateSecond, {
        toValue: secondHeight,
        duration: 2500
      }),
      Animated.timing(this.animateThird, {
        toValue: thirdHeight,
        duration: 2500
      }),
      Animated.timing(this.animateFourth, {
        toValue: fourhHeight,
        duration: 2500
      }),
      Animated.timing(this.animateOthers, {
        toValue: othersHeight,
        duration: 2500
      })
    ]).start()
    return (
      <View style={styles.background}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.sentence}>Top 4 countries</Text>
        <View style={styles.graphContainer}>
          <View style={styles.result}>
            <TouchableOpacity disabled>
              <Text style={styles.songsButtonTextDisabled}>Songs</Text>
            </TouchableOpacity>
            <Animated.View style={[this.graphStyle.others, styles.graphColoumn]} />
            <Text style={styles.votes}>
              {this.props.countries.others.votes ? this.props.countries.others.votes : 0}%
            </Text>
            <Text style={styles.votes}>{this.props.countries.others.countryCode}</Text>
          </View>
          <View style={styles.result}>
            <TouchableOpacity
              onPress={() => this.handleSongsPress(this.props.countries.fourth.countryCode)}
              disabled={!this.props.countries.fourth.votes}
            >
              <Text
                style={
                  this.props.countries.fourth.votes
                    ? styles.songsButtonText
                    : styles.songsButtonTextDisabled
                }
              >
                Songs
              </Text>
            </TouchableOpacity>
            <Animated.View style={[this.graphStyle.fourth, styles.graphColoumn]} />
            <Text style={styles.votes}>
              {this.props.countries.fourth.votes ? this.props.countries.fourth.votes : 0}%
            </Text>
            <Text style={styles.votes}>
              {this.props.countries.fourth.countryCode
                ? countryCodeLookup
                    .byIso(this.props.countries.fourth.countryCode)
                    .country.slice(0, 11)
                : ''}
            </Text>
          </View>
          <View style={styles.result}>
            <TouchableOpacity
              onPress={() => this.handleSongsPress(this.props.countries.third.countryCode)}
              disabled={!this.props.countries.third.votes}
            >
              <Text
                style={
                  this.props.countries.third.votes
                    ? styles.songsButtonText
                    : styles.songsButtonTextDisabled
                }
              >
                Songs
              </Text>
            </TouchableOpacity>
            <Animated.View style={[this.graphStyle.third, styles.graphColoumn]} />
            <Text style={styles.votes}>
              {this.props.countries.third.votes ? this.props.countries.third.votes : 0}%
            </Text>
            <Text style={styles.votes}>
              {this.props.countries.third.countryCode
                ? countryCodeLookup
                    .byIso(this.props.countries.third.countryCode)
                    .country.slice(0, 11)
                : ''}
            </Text>
          </View>
          <View style={styles.result}>
            <TouchableOpacity
              onPress={() => this.handleSongsPress(this.props.countries.second.countryCode)}
              disabled={!this.props.countries.second.votes}
            >
              <Text
                style={
                  this.props.countries.second.votes
                    ? styles.songsButtonText
                    : styles.songsButtonTextDisabled
                }
              >
                Songs
              </Text>
            </TouchableOpacity>
            <Animated.View style={[this.graphStyle.second, styles.graphColoumn]} />
            <Text style={styles.votes}>
              {this.props.countries.second.votes ? this.props.countries.second.votes : 0}%
            </Text>
            <Text style={styles.votes}>
              {this.props.countries.second.countryCode
                ? countryCodeLookup
                    .byIso(this.props.countries.second.countryCode)
                    .country.slice(0, 11)
                : ''}
            </Text>
          </View>
          <View style={styles.result}>
            <TouchableOpacity
              onPress={() => this.handleSongsPress(this.props.countries.first.countryCode)}
              disabled={!this.props.countries.first.votes}
            >
              <Text
                style={
                  this.props.countries.first.votes
                    ? styles.songsButtonText
                    : styles.songsButtonTextDisabled
                }
              >
                Songs
              </Text>
            </TouchableOpacity>
            <Animated.View style={[this.graphStyle.first, styles.graphColoumn]} />
            <Text style={styles.votes}>
              {this.props.countries.first.votes ? this.props.countries.first.votes : 0}%
            </Text>
            <Text style={styles.votes}>
              {this.props.countries.first.countryCode
                ? countryCodeLookup
                    .byIso(this.props.countries.first.countryCode)
                    .country.slice(0, 11)
                : ''}
            </Text>
          </View>
        </View>
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
        <Text style={styles.sentence}>Top 4 countries</Text>
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

CountryStatus.propTypes = {
  navigation: PropTypes.object,
  shuldSowLoader: PropTypes.bool,
  errorOccured: PropTypes.bool,
  errorMessage: PropTypes.string,
  selectedArtist: PropTypes.string,
  fetchTopCountries: PropTypes.func,
  countries: PropTypes.object,
  isArtistFound: PropTypes.bool,
  selectCountry: PropTypes.func
}

export default connect(
  mapStateToProps,
  { fetchTopCountries, selectCountry }
)(CountryStatus)
