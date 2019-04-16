// NOTE: no types yet, see https://github.com/mapbox/mapbox-sdk-js/issues/213
import mapboxDirections from '@mapbox/mapbox-sdk/services/directions'
import configs from '../../../configs'

export default class DirectionsClient {

  private mapboxDirectionsClient: mapboxDirections

  constructor() {
    const { accessToken } = configs.mapbox
    this.mapboxDirectionsClient = new mapboxDirections({ accessToken })
  }

  public async fetchDirections(waypoints: number[][]) {
    // TODO: query voice instructions when voice display selected: https://github.com/mapbox/mapbox-sdk-js/blob/master/docs/services.md#getdirections
    const { profile } = configs.mapbox.directions
    const directionsWaypoints = waypoints.map(waypoint => ({ coordinates: waypoint }))
    const response = await this.mapboxDirectionsClient
      .getDirections({
        profile,
        geometries: 'geojson',
        steps: true,
        bannerInstructions: true,
        voiceInstructions: true,
        annotations: ['distance'],
        waypoints: directionsWaypoints
      })
      .send()
    const { body: directions } = response
    return directions
  }
}
