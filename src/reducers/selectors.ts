import { point } from '@turf/helpers'
import nearestPointOnLine from '@turf/nearest-point-on-line'
import lineSlice from '@turf/line-slice'
import * as turfInvariant from '@turf/invariant'
import { createSelector } from 'reselect'
import turfDistance from '@turf/distance'
import { getRouteGeometry, getCurrentNavigationStep, getPreviousNavigationStep } from './maps'
import { getCurrentPosition as getActualCurrentPosition } from './geolocation'
import { getIsDemoMode } from './settings'

export const getCurrentPosition = createSelector(
  [getActualCurrentPosition, getIsDemoMode, getPreviousNavigationStep],
  (actualCurrentPosition, isDemoMode, previousNavigationStep) => {
    if (!isDemoMode || !previousNavigationStep) return actualCurrentPosition
    return point(previousNavigationStep.maneuver.location)
  }
)

export const getDistanceToNextManeuver = createSelector(
  [getCurrentPosition, getCurrentNavigationStep],
  (currentPosition, currentNavigationStep) => {
    if (!currentPosition || !currentNavigationStep) return -1

    const { maneuver } = currentNavigationStep
    const maneuverPosition = point(maneuver.location)
    const distanceToNextManeuver = turfDistance(
      currentPosition, maneuverPosition,
      { units: 'kilometers' }
    )

    return distanceToNextManeuver
  }
)

export const getRouteProgress = createSelector(
  [getCurrentPosition, getRouteGeometry],
  (currentPosition, routeGeometry) => {
    if (!currentPosition || !routeGeometry) return null

    const nearestPositionOnRoute = nearestPointOnLine(routeGeometry, currentPosition)
    const routeCoords = turfInvariant.getCoords(routeGeometry)
    const startingPosition = point(routeCoords[0])
    const progressGeometry = lineSlice(startingPosition, currentPosition, routeGeometry)
    return {
      position: nearestPositionOnRoute,
      geometry: progressGeometry
    }
  }
)
