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
import type { Phase } from './types/timer'
import './styles/global.css'
import './styles/animations.css'

const RING_TRACK_COLORS: Record<Phase, string> = {
  work: 'rgba(60, 20, 30, 0.6)',
  shortBreak: 'rgba(20, 60, 35, 0.6)',
  longBreak: 'rgba(20, 35, 70, 0.6)',
}

export default function App() {
  useStoreSync()
  const { phase } = useTimer()
  const [showSettings, setShowSettings] = useState(false)
  const [showStats, setShowStats] = useState(false)

  const bgColor = PHASE_COLORS[phase]

  return (
    <div className="app" style={{
      '--phase-color': bgColor,
      '--phase-color-soft': `${bgColor}40`,
      '--phase-color-glow': `${bgColor}80`,
      '--ring-track': RING_TRACK_COLORS[phase],
    } as React.CSSProperties}>
      <TitleBar onSettings={() => setShowSettings(true)} />
      <DailyProgress />

      <div className="app-content">
        <div className={`timer-view ${showStats ? 'view-hidden' : 'view-visible'}`}>
          <TimerDisplay />
          <PhaseIndicator />
          <TaskInput />
          <TimerControls />
          <button className="btn-stats" onClick={() => setShowStats(true)}>
            查看统计
          </button>
        </div>
        <div className={`stats-view ${showStats ? 'view-visible' : 'view-hidden'}`}>
          <StatsPanel />
          <StatsCalendar />
          <button className="btn-stats" onClick={() => setShowStats(false)}>
            返回计时
          </button>
        </div>
      </div>

      <SoundPlayer />
      {showSettings && <SettingsDialog onClose={() => setShowSettings(false)} />}
    </div>
  )
}