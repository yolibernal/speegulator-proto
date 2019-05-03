import { Display } from './Display'
import Tts from 'react-native-tts'

export class VoiceCommandDisplay implements Display {

  constructor(private options: {commands: { increase: string, decrease: string }, duckingEnabled: boolean}) {
    Tts.setDucking(options.duckingEnabled)
  }

  async displayDecreaseSpeed(): Promise<void> {
    await Tts.speak(this.options.commands.decrease)
  }

  async displayIncreaseSpeed(): Promise<void> {
    await Tts.speak(this.options.commands.increase)
  }

  async maneuver(options) {
    if (!options.voiceInstructions) return
    const { announcement } = options.voiceInstructions
    await Tts.speak(announcement)
  }
}
