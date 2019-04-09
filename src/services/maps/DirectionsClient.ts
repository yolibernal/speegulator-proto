import mapboxDirections from '@mapbox/mapbox-sdk/services/directions'
import configs from '../../../configs'

export default class DirectionsClient {

  private mapboxDirectionsClient: mapboxDirections

  constructor() {
    const { accessToken } = configs.mapbox
    this.mapboxDirectionsClient = new mapboxDirections({ accessToken })
  }

  public async getDirections(waypoints: number[][]) {
    const { profile } = configs.mapbox.directions
    const directionsWaypoints = waypoints.map(waypoint => ({ coordinates: waypoint }))
    const response = await this.mapboxDirectionsClient
      .getDirections({
        profile,
        waypoints: directionsWaypoints
      })
      .send()
    const { body: directions } = response
    return directions
  }
}
