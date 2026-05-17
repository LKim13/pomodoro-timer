import { create } from 'zustand'
import type { Settings } from '../types/timer'
import { DEFAULT_SETTINGS } from '../types/timer'

interface SettingsStore extends Settings {
  loaded: boolean
  load: () => Promise<void>
  update: (partial: Partial<Settings>) => void
  reset: () => void
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  ...DEFAULT_SETTINGS,
  loaded: false,

  load: async () => {
    const settings = await window.api.getSettings()
    set({ ...settings, loaded: true })
  },

  update: (partial) => {
    const current = get()
    const updated = { ...current, ...partial }
    set(updated)
    window.api.updateSettings(partial)
  },

  reset: () => {
    set({ ...DEFAULT_SETTINGS })
    window.api.updateSettings(DEFAULT_SETTINGS)
  }
}))