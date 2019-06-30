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
import { changeMail, changePassword, resetParameters, loginSuccess } from './actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Header } from 'react-navigation'
import { MANAGER_ACCESS_TOKEN } from '../../../config'
import { getGenericPassword } from 'react-native-keychain'
import TouchID from 'react-native-touch-id'

const mapStateToProps = state => ({
  email: state.signIn.email,
  password: state.signIn.password
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
    top: Dimensions.get('window').height * 0.565,
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
  app: {
    flex: 1,
    backgroundColor: '#181818'
  }
})

class SignIn extends React.Component {
  static navigationOptions = () => ({
    title: 'Sign in',
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
    this.handleMailChange = this.handleMailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderUIWithLoader = this.renderUIWithLoader.bind(this)
    this.renderUI = this.renderUI.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.state = {
      shouldShowLoader: false
    }
  }

  async componentDidMount() {
    TouchID.authenticate()
      .then(async () => {
        try {
          const credentials = await getGenericPassword()
          if (credentials) {
            this.props.changeMail(credentials.username)
            this.props.changePassword(credentials.password)
          } else {
            Alert.alert('Missing credentials')
          }
        } catch (ex) {
          Alert.alert('Face ID / Touch ID error')
        }
      })
      .catch(() => {
        // Do nothing
      })
  }

  handleMailChange(text) {
    this.props.changeMail(text)
  }

  handlePasswordChange(text) {
    this.props.changePassword(text)
  }

  handleSignUp() {
    const { navigate } = this.props.navigation
    navigate('SignUp')
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
        password: this.props.password
      })
    }
    const url = 'https://tourbuilder1.herokuapp.com/login'
    fetch(url, options)
      .then(res => res.json())
      .then(async response => {
        this.setState({ shouldShowLoader: false })
        if (response.statusCode !== 200) {
          this.props.resetParameters()
          Alert.alert(response.message)
        } else {
          this.props.loginSuccess(response.data.sessionID)
          const { navigate } = this.props.navigation
          navigate('Home')
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

  renderUIWithLoader() {
    return (
      <SafeAreaView style={styles.app}>
        <View style={styles.background} pointerEvents="none">
          <Image source={require('../../../images/logo.png')} style={styles.logo} />
          <Image source={require('../../../images/loader.gif')} style={styles.loader} />
          <Text style={styles.title}>Sign in</Text>
          <TextInput
            value={this.props.email}
            onChangeText={this.handleMailChange}
            clearButtonMode={'always'}
            style={styles.textInput}
            placeholder={'Email'}
            placeholderTextColor={'#f2f0f1'}
          />
          <TextInput
            value={this.props.password}
            onChangeText={this.handlePasswordChange}
            secureTextEntry
            clearButtonMode={'always'}
            style={styles.textInput}
            placeholder={'Password'}
            placeholderTextColor={'#f2f0f1'}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <Text style={styles.sentence}>Not register yet? </Text>
            <TouchableOpacity style={styles.signinButton}>
              <Text style={styles.sentenceLink}>Sign up</Text>
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
            keyboardVerticalOffset={Header.HEIGHT + Dimensions.get('window').height / 1.8}
          >
            <Image source={require('../../../images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Sign in</Text>
            <TextInput
              value={this.props.email}
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
              value={this.props.password}
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
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
            <View style={styles.container}>
              <Text style={styles.sentence}>Not register yet? </Text>
              <TouchableOpacity style={styles.signinButton} onPress={this.handleSignUp}>
                <Text style={styles.sentenceLink}>Sign up</Text>
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

SignIn.propTypes = {
  navigation: PropTypes.object,
  email: PropTypes.string,
  password: PropTypes.string,
  changeMail: PropTypes.func,
  changePassword: PropTypes.func,
  loginSuccess: PropTypes.func,
  resetParameters: PropTypes.func
}

export default connect(
  mapStateToProps,
  { changeMail, changePassword, resetParameters, loginSuccess }
)(SignIn)
