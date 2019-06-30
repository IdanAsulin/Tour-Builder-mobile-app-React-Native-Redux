import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#181818',
    height: '100%',
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Light',
    fontSize: 42,
    top: Dimensions.get('window').height * 0.02,
    width: Dimensions.get('window').width * 0.84,
    textAlign: 'center'
  },
  sentence: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Light',
    width: Dimensions.get('window').width * 0.76,
    textAlign: 'center',
    fontSize: 22,
    top: Dimensions.get('window').height * 0.09
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
  }
})

class SuccessPage extends React.Component {
  static navigationOptions = props => {
    const { navigation } = props
    const { state } = navigation
    const { params } = state
    return {
      headerStyle: {
        backgroundColor: '#181818',
        borderBottomWidth: 0,
        height: Dimensions.get('window').height * 0.2
      },
      headerLeft: null,
      gesturesEnabled: false,
      headerTintColor: '#f2f0f1',
      headerBackground: params ? (
        <Image source={params.artistImage} style={styles.artistImage} />
      ) : null
    }
  }

  constructor(props) {
    super(props)
    this.handleStatusPress = this.handleStatusPress.bind(this)
    this.handleHomePress = this.handleHomePress.bind(this)
  }

  handleHomePress() {
    const { navigate } = this.props.navigation
    navigate('Home')
  }

  handleStatusPress() {
    const { navigate } = this.props.navigation
    navigate('StatusPage')
  }

  render() {
    return (
      <View style={styles.background}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Your vote has been successfully submitted</Text>
        <Text style={styles.sentence}>
          You can always stay up to date by checking the status page below ...
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
}

SuccessPage.propTypes = {
  navigation: PropTypes.object
}

export default SuccessPage
