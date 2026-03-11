import { type ComposableOptions, useSound } from '@vueuse/sound'
import click from '@/assets/sounds/click.mp3'
import click2 from '@/assets/sounds/click2.mp3'

export const useSounds = (options: ComposableOptions = { volume: 0.2 }) => {
  return {
    clickSound: useSound(click, options),
    click2Sound: useSound(click2, options),
  }
}
