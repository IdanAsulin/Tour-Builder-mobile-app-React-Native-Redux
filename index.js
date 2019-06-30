import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import React from 'react'
import store from './src/store'
import { Provider } from 'react-redux'

class Application extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent(appName, () => Application)
