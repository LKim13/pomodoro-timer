import { useState } from 'react'
import { useTimer } from './hooks/useTimer'
import { useStoreSync } from './hooks/useStoreSync'
import { TimerDisplay } from './components/TimerDisplay'
import { TimerControls } from './components/TimerControls'
import { PhaseIndicator } from './components/PhaseIndicator'
import { TaskInput } from './components/TaskInput'
import { SoundPlayer } from './components/SoundPlayer'
import { SettingsDialog } from './components/SettingsDialog'
import { StatsPanel } from './components/StatsPanel'
import { StatsCalendar } from './components/StatsCalendar'
import { DailyProgress } from './components/DailyProgress'
import { TitleBar } from './components/TitleBar'
import { PHASE_COLORS } from './types/timer'
import './styles/global.css'

export default function App() {
  useStoreSync()
  const { phase } = useTimer()
  const [showSettings, setShowSettings] = useState(false)
  const [showStats, setShowStats] = useState(false)

  const bgColor = PHASE_COLORS[phase]

  return (
    <div className="app" style={{ '--phase-color': bgColor } as React.CSSProperties}>
      <TitleBar onSettings={() => setShowSettings(true)} />
      <DailyProgress />

      {!showStats ? (
        <div className="timer-view">
          <TimerDisplay />
          <PhaseIndicator />
          <TaskInput />
          <TimerControls />
          <button className="btn-stats" onClick={() => setShowStats(true)}>
            查看统计
          </button>
        </div>
      ) : (
        <div className="stats-view">
          <StatsPanel />
          <StatsCalendar />
          <button className="btn-stats" onClick={() => setShowStats(false)}>
            返回计时
          </button>
        </div>
      )}

      <SoundPlayer />
      {showSettings && <SettingsDialog onClose={() => setShowSettings(false)} />}
    </div>
  )
}