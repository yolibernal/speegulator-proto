import { SELECT_ROUTE, REQUEST_DIRECTIONS, RECEIVE_DIRECTIONS, START_NEXT_NAVIGATION_STEP, REQUEST_DIRECTIONS_FAILED } from '../actions/maps'

const maps = (
  state = {
    routeWaypoints: [],
    directions: {
      route: null,
      routeGeometry: null,
      navigationSteps: [],
      lastUpdated: null,
      currentNavigationStepIndex: 0,
      isFetching: false
    }
  },
  action
) => {
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
        route,
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
