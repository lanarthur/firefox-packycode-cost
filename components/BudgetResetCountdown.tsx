import { useEffect, useState } from "react"

interface BudgetResetCountdownProps {
  className?: string
}

export function BudgetResetCountdown({
  className = ""
}: BudgetResetCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number
    minutes: number
    seconds: number
  }>({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)

      const diff = tomorrow.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, "0")
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
        距离预算重置还有
      </div>
      <div className="flex items-center justify-center space-x-1 font-mono text-sm font-medium">
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          <span className="text-gray-800 dark:text-gray-200">
            {formatTime(timeLeft.hours)}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-1 text-xs">
            时
          </span>
        </div>
        <span className="text-gray-400">:</span>
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          <span className="text-gray-800 dark:text-gray-200">
            {formatTime(timeLeft.minutes)}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-1 text-xs">
            分
          </span>
        </div>
        <span className="text-gray-400">:</span>
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          <span className="text-gray-800 dark:text-gray-200">
            {formatTime(timeLeft.seconds)}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-1 text-xs">
            秒
          </span>
        </div>
      </div>
    </div>
  )
}
