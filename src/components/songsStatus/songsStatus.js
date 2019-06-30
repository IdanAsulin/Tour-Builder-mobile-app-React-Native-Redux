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
  FlatList
} from 'react-native'
import { Icon } from 'react-native-elements'
import { fetchSongs } from './actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Sound = require('react-native-sound')

Sound.setCategory('Playback') // enable sound on silence mode

const mapStateToProps = state => ({
  selectedArtist: state.statusPage.selectedArtist,
  selectedCountry: state.countryStatus.selectedCountry,
  shouldShowLoader: state.songsStatus.shouldShowLoader,
  errorMessage: state.songsStatus.errorMessage,
  errorOccured: state.songsStatus.errorOccured,
  songs: state.songsStatus.songs
})

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#181818',
    height: '100%',
    flex: 1,
    alignItems: 'center'
  },
  sentence: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Light',
    fontSize: 20,
    top: Dimensions.get('window').height * 0.02
  },
  artistImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.25
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
  songsList: {
    height: Dimensions.get('window').height * 0.55,
    top: Dimensions.get('window').height * 0.03
  },
  songItem: {
    borderColor: 'rgba(242,240,241,0.25)',
    borderTopWidth: 0.18,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.07,
    backgroundColor: '#181818',
    flexDirection: 'row',
    alignItems: 'center'
  },
  firstSongItem: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.07,
    backgroundColor: '#181818',
    flexDirection: 'row',
    alignItems: 'center'
  },
  songText: {
    fontFamily: 'Lato-Regular',
    fontSize: 13,
    color: '#f2f0f1',
    opacity: 0.5,
    left: Dimensions.get('window').width * 0.05
  },
  songName: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#f2f0f1',
    marginBottom: 4,
    left: Dimensions.get('window').width * 0.05
  },
  playPause: {
    position: 'absolute',
    justifyContent: 'center',
    borderColor: '#f2f0f1',
    width: 35,
    height: 35,
    right: Dimensions.get('window').width * 0.06
  },
  loader: {
    width: 50,
    height: 50,
    top: 10,
    opacity: 0.5
  },
  flag: {
    width: Dimensions.get('window').width * 0.13,
    height: Dimensions.get('window').height * 0.06,
    marginRight: 15
  },
  titleContainer: {
    flexDirection: 'row'
  }
})

class SongsStatus extends React.Component {
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
    this.handleHomePress = this.handleHomePress.bind(this)
    this.renderSongs = this.renderSongs.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.renderUI = this.renderUI.bind(this)
    this.renderLoader = this.renderLoader.bind(this)
    this._keyExtractor = this._keyExtractor.bind(this)
    this.state = {
      currentPlayedSong: null,
      currentSongID: '',
      countryFlag: ''
    }
  }

  componentWillMount() {
    if (this.props.selectedArtist && this.props.selectedCountry)
      this.props.fetchSongs(this.props.selectedArtist, this.props.selectedCountry)
  }

  componentWillUnmount() {
    if (this.state.currentPlayedSong) this.state.currentPlayedSong.release()
  }

  handleHomePress() {
    const { navigate } = this.props.navigation
    navigate('Home')
  }

  handleStatusPress() {
    const { navigate } = this.props.navigation
    navigate('StatusPage')
  }

  handlePlay(song) {
    try {
      if (this.state.currentPlayedSong) this.state.currentPlayedSong.stop()
      const sound = new Sound(song.preview, '', error => {
        if (error) {
          Alert.alert('Please check your internet connection')
          return
        }
        this.setState({ currentPlayedSong: sound, currentSongID: song.ID })
        sound.play()
      })
    } catch (ex) {
      Alert.alert('Song preview is not available')
    }
  }

  handlePause() {
    this.state.currentPlayedSong.pause()
    this.setState({ currentPlayedSong: null, currentSongID: '' })
  }

  renderSongs({ item, index }) {
    const isCurrentPlayed = item.songID === this.state.currentSongID
    if (item.songAlbum.length > 22) item.songAlbum = `${item.songAlbum.slice(0, 22)}...`
    if (item.songName.length > 33) item.songName = `${item.songName.slice(0, 33)}...`
    if (item.songSingers.length > 14) item.songSingers = `${item.songSingers.slice(0, 14)}...`
    return (
      <TouchableOpacity
        onPress={() => {
          isCurrentPlayed
            ? this.handlePause()
            : this.handlePlay({ preview: item.songPreview, ID: item.songID })
        }}
      >
        <View style={index === 0 ? styles.firstSongItem : styles.songItem}>
          <View>
            <Text style={styles.songName}>{item.songName}</Text>
            <Text style={styles.songText}>
              {item.songSingers} | {item.songAlbum}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.playPause}
            onPress={() => {
              isCurrentPlayed
                ? this.handlePause()
                : this.handlePlay({ preview: item.songPreview, ID: item.songID })
            }}
          >
            {isCurrentPlayed ? (
              <Icon name="pause-circle" type="font-awesome" color="#f2f0f1" />
            ) : (
              <Icon name="play-circle" type="font-awesome" color="#f2f0f1" />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  _keyExtractor(item) {
    return item.songID
  }

  renderUI() {
    if (this.props.errorOccured) {
      Alert.alert(this.props.errorMessage)
      return (
        <View style={styles.background}>
          <StatusBar barStyle="light-content" />
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
    return (
      <View style={styles.background}>
        <StatusBar barStyle="light-content" />
        <View style={styles.titleContainer}>
          <Image
            source={{
              uri: `https://www.countryflags.io/${this.props.selectedCountry}/shiny/64.png`
            }}
            style={styles.flag}
          />
          <Text style={styles.sentence}>Top 10 songs</Text>
        </View>
        <View style={styles.songsList}>
          <FlatList
            data={this.props.songs}
            renderItem={this.renderSongs}
            extraData={[this.state.currentSongID]}
            keyExtractor={this._keyExtractor}
          />
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
        <View style={styles.titleContainer}>
          <Image
            source={{
              uri: `https://www.countryflags.io/${this.props.selectedCountry}/shiny/64.png`
            }}
            style={styles.flag}
          />
          <Text style={styles.sentence}>Top 10 songs</Text>
        </View>
        <Image source={require('../../../images/loader.gif')} style={styles.loader} />
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

  render() {
    return this.props.shouldShowLoader ? this.renderLoader() : this.renderUI()
  }
}

SongsStatus.propTypes = {
  navigation: PropTypes.object,
  selectedArtist: PropTypes.string,
  selectedCountry: PropTypes.string,
  fetchSongs: PropTypes.func,
  shouldShowLoader: PropTypes.bool,
  errorOccured: PropTypes.bool,
  errorMessage: PropTypes.string,
  songs: PropTypes.array
}

export default connect(
  mapStateToProps,
  { fetchSongs }
)(SongsStatus)
