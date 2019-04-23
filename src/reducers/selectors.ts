import * as turfHelpers from '@turf/helpers'
import nearestPointOnLine from '@turf/nearest-point-on-line'
import lineSlice from '@turf/line-slice'
import * as turfInvariant from '@turf/invariant'
import GeoUtils from '../scenes/RouteNavigation/services/GeoUtils'

export type Maneuver = {
  // tslint:disable-next-line: no-reserved-keywords
  type: string
  modifier: string
  instruction: string
  voiceInstructions: {
    distanceAlongGeometry: number
    announcement: string
    ssmlAnnouncement: string
  }
}
export const getNextManeuver = (currentNavigationStep): Maneuver => {
  const { type, modifier, instruction } = currentNavigationStep.maneuver
  // TODO: use bannerInstructions?
  const { voiceInstructions, bannerInstructions } = currentNavigationStep
  const nextManeuver = {
    type,
    modifier,
    instruction,
    voiceInstructions: voiceInstructions[0]
  }
  return nextManeuver
}

export const getDistanceToNextManeuver = (currentPosition, currentNavigationStep) => {
  const { maneuver } = currentNavigationStep
  const [maneuverLongitude, maneuverLatitude] = maneuver.location
  // TODO: use turf directly instead of GeoUtils wrapper
  const distanceToNextManeuver = GeoUtils.calculateDistance(currentPosition, { longitude: maneuverLongitude, latitude: maneuverLatitude })

  return distanceToNextManeuver
}

export const getRouteProgress = (currentPosition, routeGeometry) => {
  if (!currentPosition || !routeGeometry) return

  const { longitude, latitude } = currentPosition
  // TODO: convert points/lines in state/actions etc. to GeoJSON
  const currentPositionGeoJson = turfHelpers.point([longitude, latitude])

  const position = nearestPointOnLine(routeGeometry, currentPositionGeoJson)
  const routeCoords = turfInvariant.getCoords(routeGeometry)
  const startingPoint = turfHelpers.point(routeCoords[0])
  // TODO: rename after GeoJSON conversion
  const geometry = lineSlice(startingPoint, currentPositionGeoJson, routeGeometry)
  return {
    position,
    geometry
  }
}
