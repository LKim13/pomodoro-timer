import { useState } from 'react'
import { useSettingsStore } from '../stores/settingsStore'
import { DEFAULT_SETTINGS } from '../types/timer'

interface Props {
  onClose: () => void
}

export function SettingsDialog({ onClose }: Props) {
  const settings = useSettingsStore()

  const [workDuration, setWorkDuration] = useState(settings.workDuration)
  const [shortBreak, setShortBreak] = useState(settings.shortBreakDuration)
  const [longBreak, setLongBreak] = useState(settings.longBreakDuration)
  const [longBreakInterval, setLongBreakInterval] = useState(settings.longBreakInterval)
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled)
  const [autoStartBreak, setAutoStartBreak] = useState(settings.autoStartBreak)
  const [autoStartWork, setAutoStartWork] = useState(settings.autoStartWork)

  function handleSave() {
    settings.update({
      workDuration,
      shortBreakDuration: shortBreak,
      longBreakDuration: longBreak,
      longBreakInterval,
      soundEnabled,
      autoStartBreak,
      autoStartWork
    })
    onClose()
  }

  function handleReset() {
    setWorkDuration(DEFAULT_SETTINGS.workDuration)
    setShortBreak(DEFAULT_SETTINGS.shortBreakDuration)
    setLongBreak(DEFAULT_SETTINGS.longBreakDuration)
    setLongBreakInterval(DEFAULT_SETTINGS.longBreakInterval)
    setSoundEnabled(DEFAULT_SETTINGS.soundEnabled)
    setAutoStartBreak(DEFAULT_SETTINGS.autoStartBreak)
    setAutoStartWork(DEFAULT_SETTINGS.autoStartWork)
    settings.reset()
    onClose()
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-dialog" onClick={(e) => e.stopPropagation()}>
        <h2 className="settings-title">设置</h2>

        <div className="settings-group">
          <label>专注时长（分钟）</label>
          <input type="number" min={1} max={90} value={workDuration} onChange={(e) => setWorkDuration(Number(e.target.value))} />
        </div>

        <div className="settings-group">
          <label>短休息时长（分钟）</label>
          <input type="number" min={1} max={30} value={shortBreak} onChange={(e) => setShortBreak(Number(e.target.value))} />
        </div>

        <div className="settings-group">
          <label>长休息时长（分钟）</label>
          <input type="number" min={1} max={60} value={longBreak} onChange={(e) => setLongBreak(Number(e.target.value))} />
        </div>

        <div className="settings-group">
          <label>长休息间隔（个番茄）</label>
          <input type="number" min={2} max={10} value={longBreakInterval} onChange={(e) => setLongBreakInterval(Number(e.target.value))} />
        </div>

        <div className="settings-group toggle-group">
          <label>提示音</label>
          <label className="toggle-switch">
            <input type="checkbox" checked={soundEnabled} onChange={(e) => setSoundEnabled(e.target.checked)} />
            <span className="toggle-track" />
            <span className="toggle-thumb" />
          </label>
        </div>

        <div className="settings-group toggle-group">
          <label>自动开始休息</label>
          <label className="toggle-switch">
            <input type="checkbox" checked={autoStartBreak} onChange={(e) => setAutoStartBreak(e.target.checked)} />
            <span className="toggle-track" />
            <span className="toggle-thumb" />
          </label>
        </div>

        <div className="settings-group toggle-group">
          <label>自动开始专注</label>
          <label className="toggle-switch">
            <input type="checkbox" checked={autoStartWork} onChange={(e) => setAutoStartWork(e.target.checked)} />
            <span className="toggle-track" />
            <span className="toggle-thumb" />
          </label>
        </div>

        <div className="settings-actions">
          <button className="btn-secondary" onClick={handleReset}>恢复默认</button>
          <button className="btn-primary" onClick={handleSave}>保存</button>
        </div>
      </div>
    </div>
  )
}