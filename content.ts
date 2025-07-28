// Content script to extract token from packycode.com

// Function to get token from document cookies
function getTokenFromCookies(): string | null {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'token') {
      return value
    }
  }
  return null
}

// Function to get token from localStorage
function getTokenFromStorage(): string | null {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) {
      return token
    }
  } catch (error) {
    // Storage access may fail
  }
  return null
}

// Function to send token to background script
function sendTokenToBackground(token: string) {
  chrome.runtime.sendMessage({
    action: "storeToken",
    token: token,
    timestamp: Date.now()
  })
}

// Try to get token when page loads
function extractToken() {
  let token = getTokenFromCookies()
  if (!token) {
    token = getTokenFromStorage()
  }
  
  if (token) {
    sendTokenToBackground(token)
  }
}

// Extract token when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', extractToken)
} else {
  extractToken()
}

// Also try periodically in case token is loaded dynamically
setInterval(extractToken, 2000)