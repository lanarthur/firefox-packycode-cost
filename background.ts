import { Storage } from "@plasmohq/storage"

const storage = new Storage()

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
    } catch {}
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
})
