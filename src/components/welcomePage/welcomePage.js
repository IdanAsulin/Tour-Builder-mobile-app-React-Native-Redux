import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#181818',
    height: '100%',
    flex: 1,
    alignItems: 'center'
  },
  backgroundImage: {
    width: Dimensions.get('window').width * 1.06,
    height: Dimensions.get('window').height * 0.55
  },
  icon: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.11
  },
  slogen: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.4
  },
  welcome: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Light',
    fontSize: 33,
    top: 45
  },
  sentence: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Regular',
    fontSize: 19,
    top: 65
  },
  button: {
    backgroundColor: '#60685d',
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').height * 0.058,
    borderRadius: 9,
    top: 110,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Regular',
    fontSize: 19
  },
  button1: {
    top: 130
  },
  signupButton: {
    textDecorationLine: 'underline',
    color: '#f2f0f1',
    fontFamily: 'Lato-Regular',
    fontSize: 14
  }
})

class WelcomePage extends React.Component {
  constructor(props) {
    super(props)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleSignUp() {
    const { navigate } = this.props.navigation
    navigate('SignUp')
  }

  handleSignIn() {
    const { navigate } = this.props.navigation
    navigate('SignIn')
  }

  render() {
    return (
      <View style={styles.background}>
        <StatusBar barStyle="light-content" />
        <Image source={require('../../../images/homepage.jpg')} style={styles.backgroundImage} />
        <Image source={require('../../../images/Icon.png')} style={styles.icon} />
        <Image source={require('../../../images/slogen.png')} style={styles.slogen} />
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.sentence}>Please sign in to get started</Text>
        <TouchableOpacity style={styles.button} onPress={this.handleSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={this.handleSignUp}>
          <Text style={styles.signupButton}>{`Don't have an account yet? Sign up here`}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

WelcomePage.propTypes = {
  navigation: PropTypes.object
}

export default WelcomePage
