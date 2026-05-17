import { useStatsStore } from '../stores/statsStore'

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日']

export function StatsCalendar() {
  const { history } = useStatsStore()

  // 生成最近30天的网格
  const days: string[] = []
  const today = new Date()
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }

  function getColor(count: number): string {
    if (count === 0) return '#2a2a4a'
    if (count <= 2) return '#e74c3c40'
    if (count <= 4) return '#e74c3c80'
    return '#e74c3c'
  }

  return (
    <div className="stats-calendar">
      <div className="calendar-weekdays">
        {WEEKDAYS.map((d) => <span key={d} className="weekday-label">{d}</span>)}
      </div>
      <div className="calendar-grid">
        {days.map((dateKey) => {
          const stats = history[dateKey]
          const count = stats?.completedPomodoros || 0
          return (
            <div
              key={dateKey}
              className="calendar-cell"
              style={{ backgroundColor: getColor(count) }}
              title={`${dateKey}: ${count} 个番茄`}
            />
          )
        })}
      </div>
    </div>
  )
}