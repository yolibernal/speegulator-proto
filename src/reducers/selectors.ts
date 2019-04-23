import * as turfHelpers from '@turf/helpers'
import nearestPointOnLine from '@turf/nearest-point-on-line'
import lineSlice from '@turf/line-slice'
import * as turfInvariant from '@turf/invariant'
import GeoUtils from '../scenes/RouteNavigation/services/GeoUtils'
import { createSelector } from 'reselect'
import { StateType } from './index'

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

const getCurrentPosition = (state: StateType) => state.geolocation.position
const getNavigationSteps = (state: StateType) => state.maps.directions.navigationSteps
const getRouteGeometry = (state: StateType) => state.maps.directions.routeGeometry
const getCurrentNavigationStepIndex = (state: StateType) => state.maps.directions.currentNavigationStepIndex

const getCurrentNavigationStep = createSelector(
  [getNavigationSteps, getCurrentNavigationStepIndex],
  (navigationSteps, currentNavigationStepIndex) => {
    const currentNavigationStep = navigationSteps ? navigationSteps[currentNavigationStepIndex] : null
    return currentNavigationStep
  }
)

export const getNextManeuver = createSelector(
  [getCurrentNavigationStep],
  (currentNavigationStep): Maneuver | null => {
    if (!currentNavigationStep) return null

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
)

export const getDistanceToNextManeuver = createSelector(
  [getCurrentPosition, getCurrentNavigationStep],
  (currentPosition, currentNavigationStep) => {
    if (!currentPosition || !currentNavigationStep) return -1

    const { maneuver } = currentNavigationStep
    const [maneuverLongitude, maneuverLatitude] = maneuver.location
    // TODO: use turf directly instead of GeoUtils wrapper
    const distanceToNextManeuver = GeoUtils.calculateDistance(currentPosition, { longitude: maneuverLongitude, latitude: maneuverLatitude })

    return distanceToNextManeuver
  }
)

export const getRouteProgress = createSelector(
  [getCurrentPosition, getRouteGeometry],
  (currentPosition, routeGeometry) => {
    if (!currentPosition || !routeGeometry) return null

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
)
