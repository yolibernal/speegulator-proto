import { Display } from './Display'
import Tts from 'react-native-tts'

export class VoiceCommandDisplay implements Display {

  constructor(private commands: { increase: string, decrease: string }, duckingEnabled: boolean) {
    Tts.setDucking(duckingEnabled)
  }

  async displayDecreaseSpeed(): Promise<void> {
    await Tts.speak(this.commands.decrease)
  }

  async displayIncreaseSpeed(): Promise<void> {
    await Tts.speak(this.commands.increase)
  }

}
