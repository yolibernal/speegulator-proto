import * as secrets from './secrets.json'

const name = 'speegulator-proto'

const vibrationDisplay = {
  patterns: {
    speed: {
      increase: [0, 1000, 0, 2000],
      decrease: [0, 3000]
    },
    maneuver: {
      right: [0, 500],
      left: [0, 250, 0, 250]
    }
  }
}

const voiceCommandDisplay = {
  commands: {
    increase: 'Increase speed, Mothertrucker',
    decrease: 'Slow down, Cowboy!'
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
    nextStepDistanceThreshold: 0.05
  },
  display: {
    vibrationDisplay,
    voiceCommandDisplay,
    wearableDisplay
  }
}

export default configs
