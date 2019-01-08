import { connect } from 'react-redux'
import React from 'react'
import { View, Text } from 'react-native'

type Props = {}

class Settings extends React.Component<Props, {}> {
  static navigationOptions = {
    title: 'Settings',
  }

  render() {
    return (
      <View>
        <Text>These will be the settings!</Text>
        <Text>Unit (kmh, mph, m/s)</Text>
        <Text>Display (device vibration, haptic display, voice command)</Text>
        <Text>Haptic Display (connect wearable)</Text>
        <Text>Voice Display (voice type, commands)</Text>
        <Text>Vibration Display (vibration pattern)</Text>
      </View>
    )
  }
}

export default connect()(Settings)
