import { cn } from "../lib/utils"

interface ProgressBarProps {
  budget: number
  className?: string
  spent: number
  title: string
}

export function ProgressBar({
  budget,
  className,
  spent,
  title
}: ProgressBarProps) {
  const safeSpent = typeof spent === "number" && !isNaN(spent) ? spent : 0
  const safeBudget = typeof budget === "number" && !isNaN(budget) ? budget : 0

  const percentage =
    safeBudget > 0 ? Math.min((safeSpent / safeBudget) * 100, 100) : 0
  const isOverBudget = safeSpent > safeBudget

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium leading-none">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ${safeSpent.toFixed(2)} / ${safeBudget.toFixed(2)}
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-full bg-gray-200 h-2 dark:bg-gray-700">
          <div
            className={cn(
              "h-2 rounded-full transition-all",
              isOverBudget
                ? "bg-red-500"
                : percentage > 80
                  ? "bg-yellow-500"
                  : "bg-blue-500"
            )}
            style={{
              width: `${Math.min(percentage, 100)}%`
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={cn(
            "text-xs font-medium",
            isOverBudget
              ? "text-red-600"
              : percentage > 80
                ? "text-yellow-600"
                : "text-blue-600"
          )}>
          {percentage.toFixed(1)}%
        </span>

        {isOverBudget && (
          <span className="text-xs font-medium text-red-600">
            超出 ${(safeSpent - safeBudget).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  )
}
