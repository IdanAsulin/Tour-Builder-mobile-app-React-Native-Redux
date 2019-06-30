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
import { CheckBox, Icon } from 'react-native-elements'
import { fetchSongs, selectSong, unSelectSong, resetState } from './actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Sound = require('react-native-sound')

Sound.setCategory('Playback') // enable sound on silence mode

const mapStateToProps = state => ({
  selectedArtist: state.home.selectedArtist,
  songs: state.songsSelection.songs,
  selectedSongs: state.songsSelection.selectedSongs,
  shouldShowLoader: state.songsSelection.shouldShowLoader,
  errorMessage: state.songsSelection.errorMessage,
  errorOccured: state.songsSelection.errorOccured
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
    fontSize: 22,
    top: Dimensions.get('window').height * 0.02
  },
  button: {
    backgroundColor: '#60685d',
    width: Dimensions.get('window').width * 0.63,
    height: Dimensions.get('window').height * 0.055,
    borderRadius: 9,
    top: Dimensions.get('window').height * 0.049,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Regular',
    fontSize: 19
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
    height: Dimensions.get('window').height * 0.48,
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
    opacity: 0.5
  },
  songName: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#f2f0f1',
    marginBottom: 4
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
  }
})

class SongsSelection extends React.Component {
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
    this.handleNext = this.handleNext.bind(this)
    this.handleStatusPress = this.handleStatusPress.bind(this)
    this.handleHomePress = this.handleHomePress.bind(this)
    this.renderSongs = this.renderSongs.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleCheckboxPress = this.handleCheckboxPress.bind(this)
    this.renderUI = this.renderUI.bind(this)
    this.renderLoader = this.renderLoader.bind(this)
    this._keyExtractor = this._keyExtractor.bind(this)
    this.state = {
      currentPlayedSong: null,
      currentSongID: ''
    }
  }

  componentDidMount() {
    this.props.fetchSongs(this.props.selectedArtist)
  }

  componentWillUnmount() {
    if (this.state.currentPlayedSong) this.state.currentPlayedSong.release()
    this.props.resetState()
  }

  handleHomePress() {
    const { navigate } = this.props.navigation
    navigate('Home')
  }

  handleNext() {
    if (this.props.selectedSongs.length < 10) {
      Alert.alert(`You have to select ${10 - this.props.selectedSongs.length} more songs`)
      return
    }
    if (this.state.currentPlayedSong) this.state.currentPlayedSong.release()
    const { navigate } = this.props.navigation
    const { navigation } = this.props
    const { state } = navigation
    const { params } = state
    navigate({ routeName: 'CountrySelection', params: { artistImage: params.artistImage } })
  }

  handleStatusPress() {
    if (this.state.currentPlayedSong) this.state.currentPlayedSong.release()
    this.props.resetState()
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

  handleCheckboxPress(selectedSong) {
    const song = this.props.selectedSongs.find(
      song => song.songSpotifyID === selectedSong.songSpotifyID
    )
    if (song) {
      this.props.unSelectSong(song)
      return
    }
    if (this.props.selectedSongs.length === 10) {
      Alert.alert(`You've already selected 10 songs`)
      return
    }
    this.props.selectSong(selectedSong)
  }

  renderSongs({ item, index }) {
    const selectSong = this.props.selectedSongs.find(selectedSong => {
      return selectedSong.songSpotifyID === item.songSpotifyID
    })
    let isCurrentPlayed
    item.songSpotifyID === this.state.currentSongID
      ? (isCurrentPlayed = true)
      : (isCurrentPlayed = false)
    if (item.songAlbum.length > 22) item.songAlbum = `${item.songAlbum.slice(0, 22)}...`
    if (item.songName.length > 33) item.songName = `${item.songName.slice(0, 33)}...`
    if (item.songSingers.length > 14) item.songSingers = `${item.songSingers.slice(0, 14)}...`
    return (
      <TouchableOpacity
        onPress={() =>
          this.handleCheckboxPress({
            songName: item.songName,
            songSingers: item.songSingers,
            songAlbum: item.songAlbum,
            songPreviewURL: item.songPreviewURL,
            songSpotifyID: item.songSpotifyID
          })
        }
      >
        <View style={index === 0 ? styles.firstSongItem : styles.songItem}>
          <CheckBox
            checked={!!selectSong}
            size={Dimensions.get('window').height * 0.02}
            onPress={() =>
              this.handleCheckboxPress({
                songName: item.songName,
                songSingers: item.songSingers,
                songAlbum: item.songAlbum,
                songPreviewURL: item.songPreviewURL,
                songSpotifyID: item.songSpotifyID
              })
            }
            checkedIcon={'check-circle'}
            uncheckedIcon={'circle'}
            checkedColor={'#f2f0f1'}
            uncheckedColor={'#f2f0f1'}
          />
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
                : this.handlePlay({ preview: item.songPreviewURL, ID: item.songSpotifyID })
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
    return item.songSpotifyID
  }

  renderUI() {
    if (this.props.errorOccured) Alert.alert(this.props.errorMessage)
    return (
      <View style={styles.background}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.sentence}>Your 10 favorite songs ...</Text>
        <View style={styles.songsList}>
          <FlatList
            data={this.props.songs}
            renderItem={this.renderSongs}
            extraData={[this.state.currentSongID, this.props.selectedSongs]}
            keyExtractor={this._keyExtractor}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleNext}>
          <Text style={styles.buttonText}>Next</Text>
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
        <Text style={styles.sentence}>Your 10 favorite songs ...</Text>
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

SongsSelection.propTypes = {
  navigation: PropTypes.object,
  selectedArtist: PropTypes.string,
  fetchSongs: PropTypes.func,
  selectedSongs: PropTypes.array,
  songs: PropTypes.array,
  selectSong: PropTypes.func,
  unSelectSong: PropTypes.func,
  shouldShowLoader: PropTypes.bool,
  resetState: PropTypes.func,
  errorOccured: PropTypes.bool,
  errorMessage: PropTypes.string
}

export default connect(
  mapStateToProps,
  { fetchSongs, selectSong, unSelectSong, resetState }
)(SongsSelection)
