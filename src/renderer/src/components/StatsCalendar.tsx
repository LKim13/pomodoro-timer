import { useStatsStore } from '../stores/statsStore'

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日']
const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

export function StatsCalendar() {
  const { history } = useStatsStore()

  const days: string[] = []
  const today = new Date()
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }

  const currentMonthLabel = MONTH_NAMES[today.getMonth()]

  function getCellClass(count: number): string {
    if (count === 0) return 'calendar-cell calendar-cell-zero'
    if (count <= 2) return 'calendar-cell calendar-cell-low'
    if (count <= 4) return 'calendar-cell calendar-cell-medium'
    return 'calendar-cell calendar-cell-high'
  }

  function getCellColor(count: number): string {
    if (count === 0) return 'rgba(30, 40, 70, 0.4)'
    if (count <= 2) return 'var(--phase-color-soft)'
    if (count <= 4) return 'var(--phase-color-glow)'
    return 'var(--phase-color)'
  }

  const legendLevels = [0, 2, 4, 6]

  return (
    <div className="stats-calendar">
      <div className="calendar-header">
        <span className="calendar-month-label">{currentMonthLabel}</span>
      </div>
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
              className={getCellClass(count)}
              style={{ backgroundColor: getCellColor(count) }}
              title={`${dateKey}: ${count} 个番茄`}
            />
          )
        })}
      </div>
      <div className="calendar-legend">
        <span className="calendar-legend-label">少</span>
        {legendLevels.map((level, i) => (
          <div
            key={i}
            className="calendar-legend-cell"
            style={{ backgroundColor: getCellColor(level) }}
          />
        ))}
        <span className="calendar-legend-label">多</span>
      </div>
    </div>
  )
}