import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native'
import { changeName, changeMail, changePassword, googleSignin, resetParameters } from './actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Header } from 'react-navigation'
import { MANAGER_ACCESS_TOKEN } from '../../../config'
import { GoogleSignin } from 'react-native-google-signin'
import { setGenericPassword } from 'react-native-keychain'

const mapStateToProps = state => ({
  fullName: state.signUp.fullName,
  email: state.signUp.email,
  password: state.signUp.password
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
    top: Dimensions.get('window').height * 0.65,
    width: 50,
    height: 50,
    opacity: 0.5
  },
  logo: {
    top: 30
  },
  title: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Light',
    fontSize: 30,
    top: 80
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 6,
    backgroundColor: 'rgba(242,240,241,0.2)',
    borderColor: '#505f35',
    width: Dimensions.get('window').width * 0.78,
    height: Dimensions.get('window').height * 0.06,
    top: 100,
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    color: '#f2f0f1',
    paddingLeft: 10,
    marginTop: 20
  },
  button: {
    backgroundColor: '#60685d',
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').height * 0.058,
    borderRadius: 9,
    top: 130,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Regular',
    fontSize: 19
  },
  sentence: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Regular',
    fontSize: 16
  },
  sentenceLink: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  container: {
    flexDirection: 'row',
    top: 180
  },
  googleSignIn: {
    top: Dimensions.get('window').height * 0.245
  },
  googleButton: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  googleLogo: {
    width: Dimensions.get('window').width * 0.08,
    height: Dimensions.get('window').height * 0.08
  },
  googleText: {
    fontFamily: 'Lato-Regular',
    fontSize: 17,
    color: '#f2f0f1'
  },
  app: {
    flex: 1,
    backgroundColor: '#181818'
  }
})

class SignUp extends React.Component {
  static navigationOptions = () => ({
    title: 'Sign up',
    headerStyle: {
      backgroundColor: '#181818'
    },
    headerTitleStyle: {
      fontSize: 18,
      fontFamily: 'Lato-Bold',
      color: '#f2f0f1'
    },
    headerTintColor: '#f2f0f1'
  })

  constructor(props) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleMailChange = this.handleMailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderUIWithLoader = this.renderUIWithLoader.bind(this)
    this.renderUI = this.renderUI.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.handleGoogleSignin = this.handleGoogleSignin.bind(this)
    this.googleSignOut = this.googleSignOut.bind(this)
    GoogleSignin.configure()
    this.state = {
      shouldShowLoader: false
    }
  }

  componentDidMount() {
    this.googleSignOut()
  }

  handleNameChange(text) {
    this.props.changeName(text)
  }

  handleMailChange(text) {
    this.props.changeMail(text)
  }

  handlePasswordChange(text) {
    this.props.changePassword(text)
  }

  handleSignIn() {
    const { navigate } = this.props.navigation
    navigate('SignIn')
  }

  handleSubmit() {
    this.setState({ shouldShowLoader: true })
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        managertoken: MANAGER_ACCESS_TOKEN
      },
      body: JSON.stringify({
        email: this.props.email.toLowerCase(),
        username: this.props.fullName,
        password: this.props.password
      })
    }
    const url = 'https://tourbuilder1.herokuapp.com/signup'
    fetch(url, options)
      .then(res => res.json())
      .then(async response => {
        this.setState({ shouldShowLoader: false })
        if (response.statusCode !== 200) {
          this.props.resetParameters()
          Alert.alert(response.message)
        } else {
          try {
            await setGenericPassword(this.props.email.toLowerCase(), this.props.password)
            const { navigate } = this.props.navigation
            navigate('AccountVerification')
          } catch (ex) {
            // do nothing
          }
        }
      })
      .catch(() => {
        this.setState({ shouldShowLoader: false })
        this.props.resetParameters()
        Alert.alert('Please try again in a few minutes')
      })
  }

  handlePress() {
    Keyboard.dismiss()
  }

  async handleGoogleSignin() {
    try {
      const loggedInUser = await GoogleSignin.signIn()
      this.setState({ shouldShowLoader: true })
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          managertoken: MANAGER_ACCESS_TOKEN
        },
        body: JSON.stringify({
          email: loggedInUser.user.email.toLowerCase(),
          username: loggedInUser.user.name
        })
      }
      const url = 'https://tourbuilder1.herokuapp.com/googleSignin'
      fetch(url, options)
        .then(res => res.json())
        .then(response => {
          if (response.statusCode !== 200) {
            this.setState({ shouldShowLoader: false })
            this.props.resetParameters()
            Alert.alert(response.message)
          } else {
            this.props.googleSignin(response.data.sessionID)
            this.setState({ shouldShowLoader: false })
            const { navigate } = this.props.navigation
            navigate('Home')
          }
        })
        .catch(() => {
          this.setState({ shouldShowLoader: false })
          Alert.alert('Please check your internet connection')
        })
    } catch (error) {
      Alert.alert('Google Signin Error')
    }
  }

  async googleSignOut() {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
    } catch (error) {
      this.handleGoogleSignInError(error)
    }
  }

  renderUIWithLoader() {
    return (
      <SafeAreaView style={styles.app}>
        <View style={styles.background} pointerEvents="none">
          <Image source={require('../../../images/logo.png')} style={styles.logo} />
          <Image source={require('../../../images/loader.gif')} style={styles.loader} />
          <Text style={styles.title}>Sign up</Text>
          <TextInput
            defaultValue={this.props.fullName}
            onChangeText={this.handleNameChange}
            clearButtonMode={'always'}
            style={styles.textInput}
            placeholder={'Full name'}
            placeholderTextColor={'#f2f0f1'}
          />
          <TextInput
            defaultValue={this.props.email}
            onChangeText={this.handleMailChange}
            clearButtonMode={'always'}
            style={styles.textInput}
            placeholder={'Email'}
            placeholderTextColor={'#f2f0f1'}
          />
          <TextInput
            defaultValue={this.props.password}
            onChangeText={this.handlePasswordChange}
            secureTextEntry
            clearButtonMode={'always'}
            style={styles.textInput}
            placeholder={'Password'}
            placeholderTextColor={'#f2f0f1'}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Create your account</Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <Text style={styles.sentence}>Already have an account? </Text>
            <TouchableOpacity style={styles.signinButton}>
              <Text style={styles.sentenceLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.googleSignIn}>
            <TouchableOpacity onPress={this.handleGoogleSignin}>
              <View style={styles.googleButton}>
                <Image
                  source={require('../../../images/googleSignIn.png')}
                  style={styles.googleLogo}
                />
                <Text style={styles.googleText}> Sign in with Google</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  renderUI() {
    return (
      <SafeAreaView style={styles.app}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <KeyboardAvoidingView
            style={styles.background}
            behavior={'padding'}
            keyboardVerticalOffset={Header.HEIGHT + Dimensions.get('window').height / 1.79}
          >
            <Image source={require('../../../images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Sign up</Text>
            <TextInput
              onChangeText={this.handleNameChange}
              autoCorrect={false}
              enablesReturnKeyAutomatically
              keyboardAppearance={'dark'}
              clearButtonMode={'always'}
              style={styles.textInput}
              placeholder={'Full name'}
              placeholderTextColor={'#f2f0f1'}
            />
            <TextInput
              onChangeText={this.handleMailChange}
              autoCorrect={false}
              textContentType="username"
              autoCompleteType="username"
              enablesReturnKeyAutomatically
              keyboardAppearance={'dark'}
              keyboardType={'email-address'}
              clearButtonMode={'always'}
              style={styles.textInput}
              placeholder={'Email'}
              placeholderTextColor={'#f2f0f1'}
            />
            <TextInput
              onChangeText={this.handlePasswordChange}
              autoCorrect={false}
              textContentType="password"
              autoCompleteType="password"
              enablesReturnKeyAutomatically
              keyboardAppearance={'dark'}
              secureTextEntry
              clearButtonMode={'always'}
              style={styles.textInput}
              placeholder={'Password'}
              placeholderTextColor={'#f2f0f1'}
            />
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>Create your account</Text>
            </TouchableOpacity>
            <View style={styles.container}>
              <Text style={styles.sentence}>Already have an account? </Text>
              <TouchableOpacity style={styles.signinButton} onPress={this.handleSignIn}>
                <Text style={styles.sentenceLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.googleSignIn}>
              <TouchableOpacity onPress={this.handleGoogleSignin}>
                <View style={styles.googleButton}>
                  <Image
                    source={require('../../../images/googleSignIn.png')}
                    style={styles.googleLogo}
                  />
                  <Text style={styles.googleText}> Sign in with Google</Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    )
  }

  render() {
    return this.state.shouldShowLoader ? this.renderUIWithLoader() : this.renderUI()
  }
}

SignUp.propTypes = {
  navigation: PropTypes.object,
  fullName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  changeName: PropTypes.func,
  resetParameters: PropTypes.func,
  changeMail: PropTypes.func,
  changePassword: PropTypes.func,
  googleSignin: PropTypes.func
}

export default connect(
  mapStateToProps,
  { changeName, changeMail, changePassword, googleSignin, resetParameters }
)(SignUp)
