import { connect } from 'react-redux'
import React from 'react'
import { StateType } from '../../reducers'
import { Text, ScrollView } from 'react-native'

type Props = {
  isFetching,
  directions
}

type ComponentState = {}

class RouteNavigation extends React.Component<Props, ComponentState> {
  static navigationOptions = {
    title: 'RouteNavigation'
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView>
        <Text>Is fetching: {String(this.props.isFetching)}</Text>
        <Text>Directions: {JSON.stringify(this.props.directions, null, 2)}</Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: StateType) => ({ isFetching: state.maps.isFetching, directions: state.maps.directions })
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RouteNavigation)
