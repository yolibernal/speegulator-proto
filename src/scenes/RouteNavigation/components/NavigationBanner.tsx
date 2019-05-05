import { connect } from 'react-redux'
import React from 'react'
import numeral from 'numeral'

import { StateType } from '../../../reducers'
import { Text, View } from 'react-native'
import { startNextNavigationStep } from '../../../actions/maps'
import { Button, Subheading } from 'react-native-paper'
import { Maneuver } from '../../../reducers/maps'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'

type Props = {
  distanceToNextManeuver
  maneuver: Maneuver
  startNextNavigationStep
  currentSpeed: number
  isDemoMode: boolean
}

type ComponentState = {}

class NavigationBanner extends React.Component<Props, ComponentState> {
  static navigationOptions = {
    title: 'NavigationBanner'
  }

  constructor(props: Props) {
    super(props)
  }

  render() {
    const { distanceToNextManeuver, currentSpeed } = this.props

    const displayInMeters = distanceToNextManeuver < 1

    const distanceToNextManeuverInMeters = distanceToNextManeuver * 1000
    const numberFormatted = numeral(distanceToNextManeuverInMeters).format(!displayInMeters ? '0,0.00' : '0')
    const unit = `${!displayInMeters ? 'k' : ''}m`
    const distanceToNextManeuverFormatted = `${numberFormatted} ${unit}`

    const { instruction, type, modifier } = this.props.maneuver
    return (
      <View style={styles.container}>
        <View style={styles.instructions}>
          <View style={styles.instructionsIcon}>
            {this.renderManeuverIcon(type, modifier)}
          </View>
          <View style={styles.instructionsText}>
            <Subheading>{instruction} in {distanceToNextManeuverFormatted}</Subheading>
            <Text>Current speed: {currentSpeed}</Text>
          </View>
        </View>
        {this.props.isDemoMode ? this.renderNextStepButton() : null}
      </View>
    )
  }

  renderManeuverIcon(maneuverType, modifier) {
    const size = 40
    switch (modifier) {
      case 'left':
        return <Icon style={{ marginLeft: 30 }} name={'arrow-back'} size={size} />
      case 'right':
        return <Icon style={{ marginLeft: 30 }} name={'arrow-forward'} size={size} />
    }

    switch (maneuverType) {
      case 'arrive':
        return <Icon style={{ marginLeft: 30 }} name={'check'} size={size} />
      default:
        return <Icon style={{ marginLeft: 30 }} name={'arrow-upward'} size={size} />
    }
  }

  renderNextStepButton() {
    return (
      <Button
        onPress={() => this.props.startNextNavigationStep()}
      >
        Demo: Next step
      </Button>
    )
  }
}

const mapStateToProps = (state: StateType) => ({ isDemoMode: state.settings.isDemoMode })
const mapDispatchToProps = {
  startNextNavigationStep
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBanner)
