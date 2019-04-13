import { connect } from 'react-redux'
import React from 'react'
import { StateType } from '../../reducers'
import { View } from 'react-native'
import styles from './styles'
import MapboxGL from '@mapbox/react-native-mapbox-gl'

type Props = {
  isFetching,
  directions
}

const layerStyles = MapboxGL.StyleSheet.create({
  route: {
    lineColor: 'red',
    lineWidth: 3,
    lineOpacity: 0.84,
  }
})

type ComponentState = {
  route
}

class RouteNavigation extends React.Component<Props, ComponentState> {
  static navigationOptions = {
    title: 'RouteNavigation'
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { directions } = this.props
    const route = directions ? directions.routes[0] : null
    const routeShape = route ? route.geometry : null
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          showUserLocation={true}
          zoomLevel={12}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          styleURL={MapboxGL.StyleURL.Street}
          style={styles.map}
        >
          <MapboxGL.ShapeSource id="routeSource" shape={routeShape}>
            <MapboxGL.LineLayer
              id="routeFill"
              style={layerStyles.route}
              belowLayerID="originInnerCircle"
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>
    )
  }
}

const mapStateToProps = (state: StateType) => ({ isFetching: state.maps.isFetching, directions: state.maps.directions })
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RouteNavigation)
