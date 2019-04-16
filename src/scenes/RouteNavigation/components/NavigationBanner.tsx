import { connect } from 'react-redux'
import React from 'react'
import numeral from 'numeral'

import { StateType } from '../../../reducers'
import { Text, View } from 'react-native'
import { startNextNavigationStep } from '../../../actions/maps'
import { Button } from 'react-native-elements'

type Props = {
  distanceToNextManeuver,
  maneuverType,
  startNextNavigationStep
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
    const { distanceToNextManeuver } = this.props

    const displayInMeters = distanceToNextManeuver < 1

    const distanceToNextManeuverInMeters = distanceToNextManeuver * 1000
    const numberFormatted = numeral(distanceToNextManeuverInMeters).format(!displayInMeters ? '0,0.00' : '0')
    const unit = `${!displayInMeters ? 'k' : ''}m`
    const distanceToNextManeuverFormatted = `${numberFormatted} ${unit}`

    return (
      <View>
        <Text>{distanceToNextManeuverFormatted} until {this.props.maneuverType}</Text>
        <Button title={'Next step'} onPress={() => this.props.startNextNavigationStep()} />
      </View>
    )
  }
}

const mapStateToProps = (state: StateType) => ({})
const mapDispatchToProps = {
  startNextNavigationStep
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBanner)
