import React, { Component } from 'react'
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { Text, View, TextInput, GeolocationReturnType } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles'
import { StateType } from '../../reducers'
import { DisplayType } from '../../actions/settings'
import { Display } from '../../services/display/Display'

interface Props {
  geolocation: GeolocationReturnType | {},
  displayType: DisplayType
  // TODO: type
  navigation: any,
  display: Display
}
class Home extends Component<Props, {}> {
  static navigationOptions = ({ navigation }: NavigationScreenProps): NavigationScreenOptions => ({
    title: 'Speegulator Prototype',
    headerRight: (
      <Button
        title=""
        icon={
          <Icon
            name="settings"
            size={30}
            color="white"
          />
        }
        onPress={() => navigation.navigate('Settings')}
        buttonStyle={styles.settingsButton}
      />
    ),
    headerLeft: (
      <Button
        title=""
        icon={
          <Icon
            name="map"
            size={30}
            color="white"
          />
        }
        onPress={() => navigation.navigate('RouteMap')}
        buttonStyle={styles.settingsButton}
      />
    )
  })

  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Geolocation: {JSON.stringify(this.props.geolocation)}</Text>
        <Text>Display type: {this.props.displayType}</Text>
        <TextInput style={styles.speedInput} keyboardType="numeric"></TextInput>
        <Button title="Decrease speed" onPress={() => this.props.display.displayDecreaseSpeed()} />
        <Button title="Increase speed" onPress={() => this.props.display.displayIncreaseSpeed()} />
      </View>
    )
  }
}

const mapStateToProps = (state: StateType) => ({ geolocation: state.geolocation, displayType: state.settings.displayType, display: state.settings.display })

export default connect(mapStateToProps)(Home)
