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
import { artistPick, fetchArtists } from './actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import images from '../../../images/artist_images/imagesConfig'

const mapStateToProps = state => ({
  selectedArtist: state.home.selectedArtist,
  artists: state.home.artists,
  errorOccured: state.home.errorOccured,
  errorMessage: state.home.errorMessage,
  shuldSowLoader: state.home.shuldSowLoader
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
    top: Dimensions.get('window').height * 0.365,
    width: 50,
    height: 50,
    opacity: 0.5
  },
  title: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Light',
    fontSize: 43,
    top: Dimensions.get('window').height * 0.02
  },
  sentence: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Light',
    fontSize: 22,
    top: Dimensions.get('window').height * 0.1
  },
  button: {
    backgroundColor: '#60685d',
    width: Dimensions.get('window').width * 0.63,
    height: Dimensions.get('window').height * 0.056,
    borderRadius: 9,
    top: Dimensions.get('window').height * 0.24,
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
    height: Dimensions.get('window').height * 0.36,
    top: Dimensions.get('window').height * 0.13,
    borderColor: 'rgba(80,95,53,0.35)',
    borderBottomWidth: 0.2,
    borderTopWidth: 0.3
  },
  pickerItem: {
    color: '#f2f0f1',
    height: Dimensions.get('window').height * 0.36,
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
  }
})

class Home extends React.Component {
  static navigationOptions = () => ({
    title: 'Home',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#181818'
    },
    headerBackTitle: 'Back',
    headerTitleStyle: {
      fontSize: 18,
      fontFamily: 'Lato-Bold',
      color: '#f2f0f1'
    },
    headerTintColor: '#f2f0f1',
    gesturesEnabled: false
  })

  constructor(props) {
    super(props)
    this.handleNext = this.handleNext.bind(this)
    this.handleArtistPick = this.handleArtistPick.bind(this)
    this.handleStatusPress = this.handleStatusPress.bind(this)
    this.renderUI = this.renderUI.bind(this)
    this.renderLoader = this.renderLoader.bind(this)
  }

  componentDidMount() {
    this.props.fetchArtists()
  }

  handleNext() {
    const { navigate } = this.props.navigation
    const image = images.find(artist => artist.spotifyID === this.props.selectedArtist).image
    navigate({ routeName: 'SongsSelection', params: { artistImage: image } })
  }

  handleArtistPick(artist) {
    this.props.artistPick(artist)
  }

  handleStatusPress() {
    const { navigate } = this.props.navigation
    navigate('StatusPage')
  }

  renderUI() {
    if (this.props.errorOccured) Alert.alert(this.props.errorMessage)
    this.props.artists.sort((a, b) => {
      return ('' + a.name).localeCompare(b.name)
    })
    const pickerItems = this.props.artists.map((artist, index) => {
      return <Picker.Item key={index} label={artist.name} value={artist.spotifyID} />
    })
    return (
      <View style={styles.background}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Vote now !</Text>
        <Text style={styles.sentence}>Select your artist ...</Text>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={this.handleArtistPick}
          selectedValue={this.props.selectedArtist}
        >
          {pickerItems}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={this.handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <View style={styles.tabNavigation}>
          <TouchableOpacity disabled style={[styles.tabButtonContainer, styles.homeButton]}>
            <Image source={require('../../../images/homeClicked.png')} style={styles.tabIcons} />
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
        <Text style={styles.title}>Vote now !</Text>
        <Text style={styles.sentence}>Select your artist ...</Text>
        <Picker style={styles.picker} />
        <TouchableOpacity style={styles.button} onPress={this.handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <View style={styles.tabNavigation}>
          <TouchableOpacity disabled style={[styles.tabButtonContainer, styles.homeButton]}>
            <Image source={require('../../../images/homeClicked.png')} style={styles.tabIcons} />
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

Home.propTypes = {
  navigation: PropTypes.object,
  artistPick: PropTypes.func,
  fetchArtists: PropTypes.func,
  selectedArtist: PropTypes.string,
  artists: PropTypes.array,
  errorOccured: PropTypes.bool,
  errorMessage: PropTypes.string,
  shuldSowLoader: PropTypes.bool
}

export default connect(
  mapStateToProps,
  { artistPick, fetchArtists }
)(Home)
