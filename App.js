import { createStackNavigator, createAppContainer } from 'react-navigation'
import WelcomePage from './src/components/welcomePage/welcomePage'
import SignUpPage from './src/components/signUp/signUp'
import AccountVerification from './src/components/accountVerification/accountVerification'
import SignInPage from './src/components/signIn/signIn'
import Home from './src/components/home/home'
import SongsSelection from './src/components/songsSelection/songsSelection'
import CountrySelection from './src/components/countrySelection/countrySelection'
import SuccessPage from './src/components/successPage/successPage'
import StatusPage from './src/components/statusPage/statusPage'
import CountryStatus from './src/components/countryStatus/countryStatus'
import SongsStatus from './src/components/songsStatus/songsStatus'

const MainNavigator = createStackNavigator(
  {
    WelcomePage: {
      screen: WelcomePage,
      navigationOptions: {
        header: null
      }
    },
    SignUp: {
      screen: SignUpPage
    },
    AccountVerification: {
      screen: AccountVerification
    },
    SignIn: {
      screen: SignInPage
    },
    Home: {
      screen: Home
    },
    SongsSelection: {
      screen: SongsSelection
    },
    CountrySelection: {
      screen: CountrySelection
    },
    SuccessPage: {
      screen: SuccessPage
    },
    StatusPage: {
      screen: StatusPage
    },
    CountryStatus: {
      screen: CountryStatus
    },
    SongsStatus: {
      screen: SongsStatus
    }
  },
  {
    initialRouteName: 'WelcomePage',
    headerMode: 'screen'
  }
)
const App = createAppContainer(MainNavigator)

export default App
