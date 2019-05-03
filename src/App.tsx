import { createStackNavigator, createAppContainer } from 'react-navigation'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import configs from '../configs'

import Home from './scenes/Home'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import { createStore, applyMiddleware } from 'redux'
import GeolocationService from './services/geolocation/GeolocationService'
import BluetoothScanner from './services/bluetooth/BluetoothScanner'
import rootReducer from './reducers'
import Settings from './scenes/Settings'
import RouteMap from './scenes/RouteMap'
import thunkMiddleware from 'redux-thunk'

import theme from './theme'

import MapboxGL from '@mapbox/react-native-mapbox-gl'
import RouteNavigation from './scenes/RouteNavigation'

const middlewares = [
  thunkMiddleware
]
const enhancer = composeWithDevTools({})(applyMiddleware(...middlewares))

export const store = createStore(
  rootReducer,
  enhancer
)

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Settings: { screen: Settings },
  RouteMap: { screen: RouteMap },
  RouteNavigation: { screen: RouteNavigation }
})

const AppContainer = createAppContainer(AppNavigator)

MapboxGL.setAccessToken(configs.mapbox.accessToken)

// TODO: ask location permissions? (https://facebook.github.io/react-native/docs/permissionsandroid.html)
export default class App extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <GeolocationService />
          <BluetoothScanner />
          <AppContainer />
        </PaperProvider>
      </StoreProvider>
    )
  }
}
