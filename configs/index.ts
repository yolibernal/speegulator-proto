import * as secrets from './secrets.json'

const name = 'speegulator-proto'

const vibrationDisplay = {
  patterns: {
    speed: {
      increase: [0, 1000, 1000, 1000],
      decrease: [0, 2000]
    },
    maneuver: {
      right: [500, 250, 500],
      left: [500, 250, 500, 250, 500]
    }
  }
}

const voiceCommandDisplay = {
  commands: {
    increase: 'Go faster.',
    decrease: 'Slow down, cowboy.'
  },
  duckingEnabled: true
}

const wearableDisplay = {}

const configs = {
  name,
  mapbox: {
    accessToken: secrets.mapbox.accessToken,
    directions: {
      profile: 'walking'
    }
  },
  maps: {
    nextStepDistanceThreshold: 0.025
  },
  display: {
    vibrationDisplay,
    voiceCommandDisplay,
    wearableDisplay
  }
}

export default configs
