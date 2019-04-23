import React, { Component } from 'react'
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { Text, View, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles'
import { StateType } from '../../reducers'
import { GeolocationState } from '../../reducers/geolocation'
import { DisplayType } from '../../services/display/DisplayType'
import { Display } from '../../services/display/Display'
import { getDisplay } from '../../reducers/settings'
import { setDesiredSpeed } from '../../actions/settings'

interface Props {
  geolocation: GeolocationState
  displayType: DisplayType
  display: Display
  defaultDesiredSpeed: number
  setDesiredSpeed
  // TODO: type
  navigation: any
  desiredSpeed: number
}

interface ComponentState {
  desiredSpeed: number
}
class Home extends Component<Props, ComponentState> {
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
    this.state = {
      desiredSpeed: this.props.desiredSpeed
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Geolocation: {JSON.stringify(this.props.geolocation)}</Text>
        <Text>Display type: {this.props.displayType}</Text>

        <TextInput value={`${this.state.desiredSpeed || ''}`} style={styles.speedInput} onChangeText={text => this.setState({ desiredSpeed: Number.parseInt(text, 10) || 0 })} keyboardType="numeric" />
        <Button title="Set desired speed" onPress={() => this.props.setDesiredSpeed(this.state.desiredSpeed)} />

        <Button title="Decrease speed" onPress={() => this.props.display.displayDecreaseSpeed()} />
        <Button title="Increase speed" onPress={() => this.props.display.displayIncreaseSpeed()} />
      </View>
    )
  }
}

const mapDispatchToProps = { setDesiredSpeed }
const mapStateToProps = (state: StateType) => ({ geolocation: state.geolocation, displayType: state.settings.displayType, display: getDisplay(state), desiredSpeed: state.settings.desiredSpeed })

export default connect(mapStateToProps, mapDispatchToProps)(Home)
