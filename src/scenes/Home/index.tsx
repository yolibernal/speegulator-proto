import React, { Component } from 'react'
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import styles from './styles'
import { StateType } from '../../reducers'
import { setDesiredSpeed } from '../../actions/settings'
// TODO: remmove
import { WearableDisplay } from '../../services/display/WearableDisplay'

interface Props extends NavigationScreenProps {
  setDesiredSpeed
  desiredSpeed: number
}

interface ComponentState {
  desiredSpeed: number
}
// TODO: remove
const wearableDisplay = new WearableDisplay()

class Home extends Component<Props, ComponentState> {
  static navigationOptions = ({ navigation }: NavigationScreenProps): NavigationScreenOptions => ({
    title: '',
    headerRight: (
      <Button
        onPress={() => navigation.navigate('Settings')}
        icon={'settings'}
      >
        Settings
      </Button>
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
        <TextInput
          label={'Desired speed'}
          value={`${this.state.desiredSpeed || ''}`}
          onChangeText={text => this.setState({ desiredSpeed: Number.parseInt(text, 10) || 0 })} keyboardType="numeric"
          onBlur={() => this.props.setDesiredSpeed(this.state.desiredSpeed)}
          style={styles.speedInput}
        />
        <Button
          onPress={() => this.props.navigation.navigate('RouteMap')}
        >
          Next
        </Button>
        {/* TODO: remove buttons */}
        <Button onPress={async () => {
          await wearableDisplay.maneuver({ modifier: 'left' })
        }}>Vibrate Left</Button>
        <Button onPress={async () => {
          await wearableDisplay.displayDecreaseSpeed()
        }}>Vibrate Middle Left</Button>
        <Button onPress={async () => {
          await wearableDisplay.displayIncreaseSpeed()
        }}>Vibrate Middle Right</Button>
        <Button onPress={async () => {
          await wearableDisplay.maneuver({ modifier: 'right' })
        }}>Vibrate Right</Button>
      </View>
    )
  }
}

const mapDispatchToProps = { setDesiredSpeed }
const mapStateToProps = (state: StateType) => ({ desiredSpeed: state.settings.desiredSpeed })

export default connect(mapStateToProps, mapDispatchToProps)(Home)
