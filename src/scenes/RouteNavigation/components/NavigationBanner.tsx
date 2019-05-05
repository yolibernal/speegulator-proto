import { connect } from 'react-redux'
import React from 'react'
import numeral from 'numeral'

import { StateType } from '../../../reducers'
import { Text, View } from 'react-native'
import { startNextNavigationStep } from '../../../actions/maps'
import { Button } from 'react-native-paper'
import { Maneuver } from '../../../reducers/maps'

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

    const { instruction } = this.props.maneuver
    return (
      <View>
        <Text>{instruction} in {distanceToNextManeuverFormatted}</Text>
        <Text>Current speed: {currentSpeed}</Text>
        {this.props.isDemoMode ? this.renderNextStepButton() : null}
      </View>
    )
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
