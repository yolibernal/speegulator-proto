import { createStackNavigator, createAppContainer } from 'react-navigation'

import Home from './scenes/Home'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { GeolocationService } from './services/GeolocationService'
import rootReducer from './reducers'
import Settings from './scenes/Settings'

const store = createStore(rootReducer)

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Settings: { screen: Settings }
})

const AppContainer = createAppContainer(AppNavigator)

const geolocationService = new GeolocationService(store)
geolocationService.watchPosition()

// TODO: ask location permissions? (https://facebook.github.io/react-native/docs/permissionsandroid.html)
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
