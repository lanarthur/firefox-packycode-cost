import { Storage } from "@plasmohq/storage"

const storage = new Storage()

// Listen for when user visits packycode.com domain
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url?.includes("packycode.com")) {
    try {
      // Get the "token" cookie from packycode.com domain
      const tokenCookie = await chrome.cookies.get({
        name: "token",
        url: "https://www.packycode.com"
      })

      if (tokenCookie && tokenCookie.value) {
        // Store the token
        await storage.set("packy_token", tokenCookie.value)
        await storage.set("packy_token_timestamp", Date.now())

        console.log("Token collected from packycode.com cookie")
      }
    } catch (error) {
      console.error("Error collecting token:", error)
    }
  }
})

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getStoredToken") {
    storage.get("packy_token").then((token) => {
      storage.get("packy_token_timestamp").then((timestamp) => {
        sendResponse({ timestamp, token })
      })
    })
    return true // Keep message channel open for async response
  }
})
