import { trackEvent } from "./core"

// Track user sign up
export function trackSignUp(method: string): void {
  trackEvent("sign_up", {
    sign_up_method: method,
  })
}

/**
 * Track user login
 * 
 * @param method - Login method (e.g., 'github', 'email')
 */
export function trackLogin(method: string): void {
  trackEvent("login", {
    login_method: method,
  })
}

/**
 * Track user logout
 */
export function trackLogout(): void {
  trackEvent("logout", {})
}

/**
 * Track profile update
 * 
 * @param fieldsUpdated - Array of field names that were updated
 */
export function trackProfileUpdate(fieldsUpdated: string[]): void {
  trackEvent("profile_update", {
    fields_updated: fieldsUpdated,
  })
}

/**
 * Track settings change
 * 
 * @param settingName - Name of the setting changed
 * @param settingValue - New value of the setting
 */
export function trackSettingsChange(settingName: string, settingValue: unknown): void {
  trackEvent("settings_change", {
    setting_name: settingName,
    setting_value: settingValue,
  })
}

