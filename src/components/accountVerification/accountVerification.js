import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native'
import { Header } from 'react-navigation'
import PropTypes from 'prop-types'
import { MANAGER_ACCESS_TOKEN } from '../../../config'

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#181818',
    height: '100%',
    flex: 1,
    alignItems: 'center'
  },
  loader: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.46,
    width: 50,
    height: 50,
    opacity: 0.5
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
  logo: {
    top: 30
  },
  welcome: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Light',
    fontSize: 33,
    top: 65
  },
  sentence: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Regular',
    fontSize: 17,
    top: 85,
    width: Dimensions.get('window').width * 0.75,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#60685d',
    width: Dimensions.get('window').width * 0.55,
    height: Dimensions.get('window').height * 0.058,
    borderRadius: 9,
    top: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#f2f0f1',
    fontFamily: 'Lato-Regular',
    fontSize: 19
  }
})

class AccountVerification extends React.Component {
  static navigationOptions = () => ({
    title: 'Account verification',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#181818'
    },
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
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderUIWithLoader = this.renderUIWithLoader.bind(this)
    this.renderUI = this.renderUI.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.handleKeyboardClose = this.handleKeyboardClose.bind(this)
    this.state = {
      verificationCode: '',
      shouldShowLoader: false
    }
  }

  handleChangeText(text) {
    this.setState({ verificationCode: text })
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
        verificationCode: this.state.verificationCode
      })
    }
    const url = 'https://tourbuilder1.herokuapp.com/verify'
    fetch(url, options)
      .then(res => res.json())
      .then(response => {
        if (response.statusCode !== 200) {
          this.setState({ verificationCode: '', shouldShowLoader: false })
          Alert.alert(response.message)
        } else {
          this.setState({ shouldShowLoader: false })
          const { navigate } = this.props.navigation
          navigate('SignIn')
        }
      })
      .catch(() => {
        this.setState({ verificationCode: '', shouldShowLoader: false })
        Alert.alert('Please try again in a few minutes')
      })
  }

  handlePress() {
    Keyboard.dismiss()
  }

  handleKeyboardClose() {
    Keyboard.dismiss()
  }

  renderUIWithLoader() {
    return (
      <View style={styles.background} pointerEvents="none">
        <Image source={require('../../../images/logo.png')} style={styles.logo} />
        <Image source={require('../../../images/loader.gif')} style={styles.loader} />
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.sentence}>
          Please check your mail inbox (or spam) and enter the verification code we just sent you
        </Text>
        <TextInput
          value={this.state.verificationCode}
          onChangeText={this.handleChangeText}
          clearButtonMode={'always'}
          style={styles.textInput}
          placeholder={'Verification code'}
          placeholderTextColor={'#f2f0f1'}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderUI() {
    return (
      <TouchableWithoutFeedback onPress={this.handleKeyboardClose}>
        <KeyboardAvoidingView
          style={styles.background}
          behavior={'padding'}
          keyboardVerticalOffset={Header.HEIGHT + 420}
        >
          <View style={styles.background}>
            <Image source={require('../../../images/logo.png')} style={styles.logo} />
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.sentence}>
              Please check your mail inbox (or spam) and enter the verification code we just sent
              you
            </Text>
            <TextInput
              onChangeText={this.handleChangeText}
              autoCorrect={false}
              enablesReturnKeyAutomatically
              keyboardAppearance={'dark'}
              clearButtonMode={'always'}
              style={styles.textInput}
              placeholder={'Verification code'}
              placeholderTextColor={'#f2f0f1'}
            />
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return this.state.shouldShowLoader ? this.renderUIWithLoader() : this.renderUI()
  }
}

AccountVerification.propTypes = {
  navigation: PropTypes.object
}

export default AccountVerification
