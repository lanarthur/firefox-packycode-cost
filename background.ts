import { Storage } from "@plasmohq/storage"

import { fetchUserInfo, type UserInfo } from "./utils/userInfo"

const storage = new Storage()

async function backgroundFetchUserInfo() {
  try {
    await fetchUserInfo()
  } catch (error) {
    console.error("Background fetch failed:", error)
  }
}

async function updateBadge() {
  try {
    const cachedUserInfo = await storage.get<UserInfo>("cached_user_info")

    if (cachedUserInfo && cachedUserInfo.daily_budget_usd > 0) {
      const percentage = Math.round(
        (cachedUserInfo.daily_spent_usd / cachedUserInfo.daily_budget_usd) * 100
      )

      // Firefox uses browserAction, Chrome uses action
      const badgeAPI = chrome.browserAction || chrome.action
      if (badgeAPI) {
        badgeAPI.setBadgeText({
          text: `${Math.min(percentage, 100)}%`
        })
      }
    } else {
      const badgeAPI = chrome.browserAction || chrome.action
      if (badgeAPI) {
        badgeAPI.setBadgeText({ text: "" })
      }
    }
  } catch {
    const badgeAPI = chrome.browserAction || chrome.action
    if (badgeAPI) {
      badgeAPI.setBadgeText({ text: "" })
    }
  }
}

chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url?.includes("packycode.com")) {
    try {
      const tokenCookie = await chrome.cookies.get({
        name: "token",
        url: "https://www.packycode.com"
      })

      if (tokenCookie && tokenCookie.value) {
        await storage.set("packy_token", tokenCookie.value)
        await storage.set("packy_token_timestamp", Date.now())
      }
    } catch (error) {
      // Cookie API may fail in temporary Firefox addons
    }
  }
})

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === "getStoredToken") {
    storage.get("packy_token").then((token) => {
      storage.get("packy_token_timestamp").then((timestamp) => {
        sendResponse({ timestamp, token })
      })
    })
    return true
  }

  if (request.action === "storeToken") {
    storage.set("packy_token", request.token).then(() => {
      storage.set("packy_token_timestamp", request.timestamp).then(() => {
        sendResponse({ success: true })
      })
    })
    return true
  }

  if (request.action === "updateBadge") {
    updateBadge()
    sendResponse({ success: true })
    return true
  }
})

chrome.storage.onChanged.addListener((changes) => {
  if (changes.cached_user_info) {
    updateBadge()
  }
})

function startPeriodicRefresh() {
  chrome.alarms.create("refreshUserInfo", {
    delayInMinutes: 0.5, // 30秒后首次执行
    periodInMinutes: 0.5 // 每30秒重复执行
  })
}

function stopPeriodicRefresh() {
  chrome.alarms.clear("refreshUserInfo")
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "refreshUserInfo") {
    backgroundFetchUserInfo()
  }
})

chrome.runtime.onSuspend.addListener(() => {
  stopPeriodicRefresh()
})

chrome.runtime.onStartup.addListener(() => {
  startPeriodicRefresh()
})

chrome.runtime.onInstalled.addListener(() => {
  startPeriodicRefresh()
})

updateBadge()
startPeriodicRefresh()
