import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export async function clearAuthData() {
  try {
    // Clear stored token and timestamp
    await storage.remove("packy_token")
    await storage.remove("packy_token_timestamp")

    // Clear cached user info
    await storage.remove("cached_user_info")
    await storage.remove("cache_timestamp")

    // Clear packycode.com cookies
    await chrome.cookies.remove({
      name: "token",
      url: "https://www.packycode.com"
    })

    console.log("Auth data cleared successfully")
    return true
  } catch (error) {
    console.error("Failed to clear auth data:", error)
    return false
  }
}

export async function clearPluginTokenOnly() {
  try {
    // Only clear plugin's stored token and timestamp - don't touch site cookies
    await storage.remove("packy_token")
    await storage.remove("packy_token_timestamp")

    // Clear cached user info
    await storage.remove("cached_user_info")
    await storage.remove("cache_timestamp")

    console.log("Plugin token data cleared successfully")
    return true
  } catch (error) {
    console.error("Failed to clear plugin token data:", error)
    return false
  }
}
