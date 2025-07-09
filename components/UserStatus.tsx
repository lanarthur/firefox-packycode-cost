import { formatTokenAge } from "../hooks/usePackyToken"

interface TokenData {
  isValid: boolean
  timestamp?: number
}

interface TokenExpiration {
  formatted: string
  isExpired: boolean
}

interface UserStatusProps {
  tokenData: TokenData
  tokenExpiration: TokenExpiration
}

export function UserStatus({ tokenData, tokenExpiration }: UserStatusProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">用户状态</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {tokenData.isValid ? "认证有效" : "未认证"}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`h-2 w-2 rounded-full ${
              tokenData.isValid && !tokenExpiration.isExpired
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />
        </div>
      </div>

      <div className="mt-2 space-y-1">
        {tokenData.timestamp && (
          <p className="text-xs text-gray-600 dark:text-gray-400">
            最后更新: {formatTokenAge(tokenData.timestamp)}
          </p>
        )}

        {tokenData.isValid && (
          <p
            className={`text-xs ${
              tokenExpiration.isExpired
                ? "text-red-600 dark:text-red-400"
                : "text-gray-600 dark:text-gray-400"
            }`}>
            过期时间: {tokenExpiration.formatted}
          </p>
        )}
      </div>
    </div>
  )
}
