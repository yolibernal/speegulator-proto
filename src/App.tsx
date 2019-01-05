import { createStackNavigator, createAppContainer } from 'react-navigation'

import { Home } from './scenes/Home'

const AppNavigator = createStackNavigator({
  Home: { screen: Home }
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
