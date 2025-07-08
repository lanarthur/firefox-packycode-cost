import "./reset.css"

import { useEffect } from "react"

import { ProgressBar } from "./components/ProgressBar"
import { formatTokenAge, usePackyToken } from "./hooks/usePackyToken"
import { useUserInfo } from "./hooks/useUserInfo"
import { getTokenExpiration } from "./utils/jwt"

function IndexPopup() {
  const tokenData = usePackyToken()
  const { error, loading, refresh, userInfo } = useUserInfo(tokenData.token)
  const tokenExpiration = getTokenExpiration(tokenData.token)

  const handleRefresh = () => {
    if (tokenData.isValid) {
      refresh()
    }
  }

  // Load analytics script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "//analytics.te.sb/count.js"
    script.async = true
    script.setAttribute("data-goatcounter", "https://analytics.te.sb/count")
    document.head.appendChild(script)

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="h-[600px] w-[400px] m-0 p-0 overflow-hidden bg-white dark:bg-gray-900">
      <div className="h-full w-full overflow-y-auto">
        <div className="flex flex-col space-y-6 p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight">额度查询</h2>
              {tokenData.isValid && (
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                  disabled={loading}
                  onClick={handleRefresh}
                  title="刷新额度信息">
                  <svg
                    className={`w-4 h-4 text-gray-600 dark:text-gray-300 ${loading ? "animate-spin" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              查询您的API使用额度和预算情况
            </p>
          </div>

          {/* Token Status */}
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

            {/* Token info */}
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

          {(!tokenData.isValid || tokenExpiration.isExpired) && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
              <div className="space-y-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  {!tokenData.isValid
                    ? "请先访问 packycode.com 登录以获取会话信息"
                    : "登录态已过期，请重新登录"}
                </p>
                <button
                  className="w-full rounded-md bg-yellow-600 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors dark:bg-yellow-700 dark:hover:bg-yellow-600"
                  onClick={() =>
                    chrome.tabs.create({
                      url: "https://www.packycode.com/dashboard"
                    })
                  }>
                  {!tokenData.isValid ? "前往登录" : "重新登录"}
                </button>
              </div>
            </div>
          )}

          {/* Progress Bars */}
          {tokenData.isValid && !tokenExpiration.isExpired && (
            <div className="space-y-4">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    加载失败: {error}
                  </p>
                </div>
              )}

              {!userInfo && loading && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-24"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-16"></div>
                      </div>
                      <div className="overflow-hidden rounded-full bg-gray-200 h-2 dark:bg-gray-700">
                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse w-1/3"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-12"></div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-24"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-16"></div>
                      </div>
                      <div className="overflow-hidden rounded-full bg-gray-200 h-2 dark:bg-gray-700">
                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse w-2/3"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {userInfo && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <ProgressBar
                      budget={userInfo.daily_budget_usd}
                      spent={userInfo.daily_spent_usd}
                      title="日预算使用情况"
                    />
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <ProgressBar
                      budget={userInfo.monthly_budget_usd}
                      spent={userInfo.monthly_spent_usd}
                      title="月预算使用情况"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-2">
            <div className="grid grid-cols-1 gap-2">
              <button
                className="flex flex-col items-start justify-center px-3 py-3 text-sm font-medium text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
                onClick={() =>
                  chrome.tabs.create({
                    url: "https://www.packycode.com/dashboard"
                  })
                }
                style={{
                  backgroundColor: "rgb(209, 116, 85)",
                  borderColor: "rgb(209, 116, 85)"
                }}>
                <span className="font-semibold">控制台</span>
                <span className="text-xs opacity-80 mt-1">
                  前往 PackyCode 管理控制台
                </span>
              </button>
              <button
                className="flex flex-col items-start justify-center px-3 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                onClick={() =>
                  chrome.tabs.create({ url: "https://packy.te.sb/" })
                }>
                <span className="font-semibold">网络测速</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  实时监测 API 响应时间与网络连接质量
                </span>
              </button>
              <button
                className="flex flex-col items-start justify-center px-3 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                onClick={() =>
                  chrome.tabs.create({
                    url: "https://packy-status.te.sb/status/api"
                  })
                }>
                <span className="font-semibold">服务监控</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  查看服务可用性状态与历史运行数据
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
