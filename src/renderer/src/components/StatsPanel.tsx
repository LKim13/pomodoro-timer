import { useStatsStore } from '../stores/statsStore'

export function StatsPanel() {
  const { todayCount, todayMinutes } = useStatsStore()

  return (
    <div className="stats-panel">
      <div className="stat-item">
        <span className="stat-value">{todayCount}</span>
        <span className="stat-label">今日番茄</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{todayMinutes}</span>
        <span className="stat-label">专注分钟</span>
      </div>
    </div>
  )
}