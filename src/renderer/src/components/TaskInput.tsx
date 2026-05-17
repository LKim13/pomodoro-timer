import { useTimerStore } from '../stores/timerStore'
import type { Phase } from '../types/timer'

export function TaskInput() {
  const { phase, currentTask, setCurrentTask } = useTimerStore()

  if (phase !== 'work') return null

  return (
    <div className="task-input-wrapper">
      <input
        className="task-input"
        type="text"
        placeholder="正在做什么？"
        value={currentTask}
        onChange={(e) => setCurrentTask(e.target.value)}
      />
    </div>
  )
}