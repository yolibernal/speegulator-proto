import { createStackNavigator, createAppContainer } from 'react-navigation'
import configs from '../configs'

import Home from './scenes/Home'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import GeolocationService from './services/geolocation/GeolocationService'
import rootReducer from './reducers'
import Settings from './scenes/Settings'
import RouteMap from './scenes/RouteMap'

import MapboxGL from '@mapbox/react-native-mapbox-gl'

const store = createStore(rootReducer)

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Settings: { screen: Settings },
  RouteMap: { screen: RouteMap }
})

const AppContainer = createAppContainer(AppNavigator)

MapboxGL.setAccessToken(configs.mapbox.accessToken)

// TODO: ask location permissions? (https://facebook.github.io/react-native/docs/permissionsandroid.html)
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <GeolocationService />
        <AppContainer />
      </Provider>
    )
  }
}
