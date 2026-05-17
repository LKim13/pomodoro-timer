import { useEffect } from 'react'
import { useSettingsStore } from '../stores/settingsStore'
import { useStatsStore } from '../stores/statsStore'

export function useStoreSync() {
  const loadSettings = useSettingsStore((s) => s.load)
  const loadHistory = useStatsStore((s) => s.loadHistory)

  useEffect(() => {
    loadSettings()
    const today = new Date().toISOString().slice(0, 10)
    const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    loadHistory(from, today)
  }, [])
}