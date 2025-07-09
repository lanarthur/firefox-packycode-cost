import { Storage } from "@plasmohq/storage"
import { useCallback, useEffect, useState } from "react"

import { fetchUserInfo, type UserInfo } from "../utils/userInfo"

const storage = new Storage()

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
        const cachedUserInfo = await storage.get<UserInfo>("cached_user_info")
        const cacheTimestamp = await storage.get<number>("cache_timestamp")

        if (cachedUserInfo && cacheTimestamp) {
          const age = Date.now() - Number(cacheTimestamp)
          if (age < 5 * 60 * 1000) {
            setData((prev) => ({
              ...prev,
              userInfo: cachedUserInfo
            }))
          }
        }
      } catch {}
    }

    loadCachedData()
  }, [])

  const fetchUserInfoData = useCallback(async () => {
    if (!token) {
      setData({ error: null, loading: false, userInfo: null })
      return
    }

    setData((prev) => ({ ...prev, error: null, loading: true }))

    try {
      const userInfo = await fetchUserInfo()

      if (userInfo) {
        setData({ error: null, loading: false, userInfo })
      } else {
        setData({ error: null, loading: false, userInfo: null })
        window.location.reload()
      }
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
      fetchUserInfoData()
    }
  }, [fetchUserInfoData, token])

  return {
    ...data,
    refresh: fetchUserInfoData
  }
}
