import { Storage } from "@plasmohq/storage"
import { useCallback, useEffect, useState } from "react"

import { clearPluginTokenOnly } from "../utils/auth"

const storage = new Storage()

export interface UserInfo {
  daily_budget_usd: number
  daily_spent_usd: number
  monthly_budget_usd: number
  monthly_spent_usd: number
}

export interface UserInfoData {
  error: null | string
  loading: boolean
  refresh: () => void
  userInfo: null | UserInfo
}

export function useUserInfo(token: null | string): UserInfoData {
  const [data, setData] = useState<{
    error: null | string
    loading: boolean
    userInfo: null | UserInfo
  }>({
    error: null,
    loading: false,
    userInfo: null
  })

  useEffect(() => {
    const loadCachedData = async () => {
      try {
        const cachedUserInfo = await storage.get("cached_user_info")
        const cacheTimestamp = await storage.get("cache_timestamp")

        if (cachedUserInfo && cacheTimestamp) {
          const age = Date.now() - Number(cacheTimestamp)
          if (age < 5 * 60 * 1000) {
            setData((prev) => ({
              ...prev,
              userInfo: cachedUserInfo as unknown as UserInfo
            }))
          }
        }
      } catch {}
    }

    loadCachedData()
  }, [])

  const fetchUserInfo = useCallback(async () => {
    if (!token) {
      setData({ error: null, loading: false, userInfo: null })
      return
    }

    setData((prev) => ({ ...prev, error: null, loading: true }))

    try {
      const response = await fetch(
        "https://www.packycode.com/api/backend/users/info",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          method: "GET"
        }
      )

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          await clearPluginTokenOnly()
          window.location.reload()
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const rawData = await response.json()

      const userInfo: UserInfo = {
        daily_budget_usd: Number(rawData.daily_budget_usd) || 0,
        daily_spent_usd: Number(rawData.daily_spent_usd) || 0,
        monthly_budget_usd: Number(rawData.monthly_budget_usd) || 0,
        monthly_spent_usd: Number(rawData.monthly_spent_usd) || 0
      }

      await storage.set("cached_user_info", userInfo)
      await storage.set("cache_timestamp", Date.now())

      setData({ error: null, loading: false, userInfo })
    } catch (error) {
      setData({
        error: error instanceof Error ? error.message : "获取用户信息失败",
        loading: false,
        userInfo: null
      })
    }
  }, [token])

  useEffect(() => {
    if (token) {
      fetchUserInfo()
    }
  }, [fetchUserInfo, token])

  return {
    ...data,
    refresh: fetchUserInfo
  }
}
