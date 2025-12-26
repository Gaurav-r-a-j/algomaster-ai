declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

// Push event to GTM dataLayer
export function pushGTMEvent(data: Record<string, unknown>): void {
  if (typeof window === "undefined") {
    return // Server-side rendering - skip
  }

  if (!window.dataLayer) {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = []
  }

  window.dataLayer.push(data)
}

// Track a custom event
export function trackEvent(
  eventName: string,
  eventData?: Record<string, unknown>
): void {
  pushGTMEvent({
    event: eventName,
    ...eventData,
  })
}

// Track page view
export function trackPageView(path: string, title?: string): void {
  pushGTMEvent({
    event: "page_view",
    page_path: path,
    page_title: title || (typeof document !== "undefined" ? document.title : ""),
  })
}

// Track button clicks
export function trackButtonClick(buttonName: string, location?: string): void {
  trackEvent("button_click", {
    button_name: buttonName,
    button_location: location || (typeof window !== "undefined" ? window.location.pathname : ""),
  })
}

// Track form submissions
export function trackFormSubmit(formName: string, success: boolean = true): void {
  trackEvent("form_submit", {
    form_name: formName,
    form_success: success,
  })
}

// Track search queries
export function trackSearch(query: string, resultsCount: number): void {
  trackEvent("search", {
    search_query: query,
    search_results_count: resultsCount,
  })
}

// Track filter usage
export function trackFilter(filterType: string, filterValue: string): void {
  trackEvent("filter_apply", {
    filter_type: filterType,
    filter_value: filterValue,
  })
}

