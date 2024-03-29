import React, { Component } from 'react'
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { TextInput, Button, Paragraph, Headline, Subheading } from 'react-native-paper'
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
        <Headline style={styles.headline1}>
          Choose your pace!
        </Headline>
        <Subheading style= {styles.subheading1}>
          We will warn you when you run
        </Subheading>
        <Subheading>
          too fast or too slow
        </Subheading>
        <TextInput
          label={'Desired speed in kph'}
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
      </View>
    )
  }
}

const mapDispatchToProps = { setDesiredSpeed }
const mapStateToProps = (state: StateType) => ({ desiredSpeed: state.settings.desiredSpeed })

export default connect(mapStateToProps, mapDispatchToProps)(Home)
