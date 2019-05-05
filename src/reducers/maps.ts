import { SELECT_ROUTE, REQUEST_DIRECTIONS, RECEIVE_DIRECTIONS, START_NEXT_NAVIGATION_STEP, REQUEST_DIRECTIONS_FAILED } from '../actions/maps'
import { FeatureCollection, Point, LineString, point, Feature } from '@turf/helpers'
import { StateType } from './index'
import { createSelector } from 'reselect'

type MapsState = {
  routeWaypoints: FeatureCollection<Point> | null
  directions: {
    routeGeometry: LineString | null
    navigationSteps: any[]
    lastUpdated: Date | null
    currentNavigationStepIndex: number
    isFetching: boolean
  }
}

const initialState: MapsState = {
  routeWaypoints: null,
  directions: {
    routeGeometry: null,
    navigationSteps: [],
    lastUpdated: null,
    currentNavigationStepIndex: 0,
    isFetching: false
  }
}

const maps = (
  state = initialState,
  action
): MapsState => {
  switch (action.type) {
    case SELECT_ROUTE:
      return {
        ...state,
        routeWaypoints: action.routeWaypoints
      }
    case REQUEST_DIRECTIONS:
      return {
        ...state,
        directions: {
          ...state.directions,
          isFetching: true
        }
      }
    case RECEIVE_DIRECTIONS:
      const { directions: mapboxDirections, receivedAt: lastUpdated } = action
      const route = mapboxDirections.routes[0]
      const routeGeometry = route ? route.geometry : null

      const navigationSteps = route.legs.reduce(
        (result, leg) => {
          const { steps: legSteps } = leg
          return result.concat(legSteps)
        },
        []
      )
      const directions = {
        routeGeometry,
        navigationSteps,
        lastUpdated,
        currentNavigationStepIndex: 0,
        isFetching: false
      }
      return {
        ...state,
        directions
      }
    case REQUEST_DIRECTIONS_FAILED:
      return {
        ...state,
        directions: {
          ...state.directions,
          isFetching: false
        }
      }
    case START_NEXT_NAVIGATION_STEP:
      const { currentNavigationStepIndex } = state.directions
      const nextNavigationStepIndex = currentNavigationStepIndex + 1
      return {
        ...state,
        directions: {
          ...state.directions,
          currentNavigationStepIndex: nextNavigationStepIndex
        }
      }
    default:
      return state
  }
}

export default maps

export const getNavigationSteps = (state: StateType) => state.maps.directions.navigationSteps
export const getRouteGeometry = (state: StateType) => state.maps.directions.routeGeometry
export const getCurrentNavigationStepIndex = (state: StateType) => state.maps.directions.currentNavigationStepIndex

export const getPreviousNavigationStep = createSelector(
  [getNavigationSteps, getCurrentNavigationStepIndex],
  (navigationSteps, currentNavigationStepIndex) => {
    if (currentNavigationStepIndex < 1) return null
    const previousNavigationStep = navigationSteps ? navigationSteps[currentNavigationStepIndex - 1] : null
    return previousNavigationStep
  }
)

export const getCurrentNavigationStep = createSelector(
  [getNavigationSteps, getCurrentNavigationStepIndex],
  (navigationSteps, currentNavigationStepIndex) => {
    const currentNavigationStep = navigationSteps ? navigationSteps[currentNavigationStepIndex] : null
    return currentNavigationStep
  }
)

export type Maneuver = {
  // tslint:disable-next-line: no-reserved-keywords
  type: string
  modifier: string
  instruction: string
  voiceInstructions: {
    distanceAlongGeometry: number
    announcement: string
    ssmlAnnouncement: string
  } | null,
  bannerInstructions: object | null
  position: Feature<Point>
}

export const getNextManeuver = createSelector(
  [getCurrentNavigationStep],
  (currentNavigationStep): Maneuver | null => {
    if (!currentNavigationStep) return null

    const { type, modifier, instruction, location } = currentNavigationStep.maneuver
    const { voiceInstructions, bannerInstructions } = currentNavigationStep
    const nextManeuver = {
      type,
      modifier,
      instruction,
      voiceInstructions: voiceInstructions ? voiceInstructions[0] : null,
      bannerInstructions: bannerInstructions ? bannerInstructions[0] : null,
      position: point(location)
    }
    return nextManeuver
  }
)

export const getHasArrived = (state: StateType) => {
  const { navigationSteps, currentNavigationStepIndex } = state.maps.directions
  return (navigationSteps.length !== 0) && (navigationSteps.length === (currentNavigationStepIndex))
}
