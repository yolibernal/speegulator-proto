import React, { Component } from 'react'
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { View, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles'
import { StateType } from '../../reducers'
import { setDesiredSpeed } from '../../actions/settings'

interface Props extends NavigationScreenProps {
  setDesiredSpeed
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
        <TextInput value={`${this.state.desiredSpeed || ''}`} style={styles.speedInput} onChangeText={text => this.setState({ desiredSpeed: Number.parseInt(text, 10) || 0 })} keyboardType="numeric" />
        <Button title="Set desired speed" onPress={() => this.props.setDesiredSpeed(this.state.desiredSpeed)} />

        <Button
        title="Select route"
        icon={
          <Icon
            name="map"
            size={30}
            color="white"
          />
        }
        onPress={() => this.props.navigation.navigate('RouteMap')}
        buttonStyle={styles.settingsButton}
      />
      </View>
    )
  }
}

const mapDispatchToProps = { setDesiredSpeed }
const mapStateToProps = (state: StateType) => ({ desiredSpeed: state.settings.desiredSpeed })

export default connect(mapStateToProps, mapDispatchToProps)(Home)
