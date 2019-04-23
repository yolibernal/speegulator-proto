import { point } from '@turf/helpers'
import nearestPointOnLine from '@turf/nearest-point-on-line'
import lineSlice from '@turf/line-slice'
import * as turfInvariant from '@turf/invariant'
import { createSelector } from 'reselect'
import { StateType } from './index'
import turfDistance from '@turf/distance'

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
