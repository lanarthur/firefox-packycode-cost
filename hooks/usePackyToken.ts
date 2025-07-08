import { useEffect, useState } from "react"

export interface TokenData {
  isValid: boolean
  timestamp: null | number
  token: null | string
}

export function formatTokenAge(timestamp: null | number): string {
  if (!timestamp) return "未知"

  const age = Date.now() - timestamp
  const hours = Math.floor(age / (60 * 60 * 1000))
  const minutes = Math.floor((age % (60 * 60 * 1000)) / (60 * 1000))

  if (hours > 0) {
    return `${hours}小时${minutes}分钟前`
  } else {
    return `${minutes}分钟前`
  }
}

export function usePackyToken(): TokenData {
  const [tokenData, setTokenData] = useState<TokenData>({
    isValid: false,
    timestamp: null,
    token: null
  })

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getStoredToken" }, (response) => {
      if (response) {
        const { timestamp, token } = response
        const isValid =
          token && timestamp && Date.now() - timestamp < 24 * 60 * 60 * 1000

        setTokenData({
          isValid: !!isValid,
          timestamp,
          token
        })
      }
    })
  }, [])

  return tokenData
}
