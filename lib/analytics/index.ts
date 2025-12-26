// Core utilities
export {
  pushGTMEvent,
  trackEvent,
  trackPageView,
  trackButtonClick,
  trackFormSubmit,
  trackSearch,
  trackFilter,
} from "./core"

// Learning events
export {
  trackTopicView,
  trackTopicStart,
  trackTopicComplete,
  trackQuizStart,
  trackQuizComplete,
  trackModuleView,
  trackVisualizerAction,
  trackCodeExecution,
  trackTopicNavigation,
  trackProgressMilestone,
  trackTopicTimeSpent,
  trackTopicTabSwitch,
} from "./learning"

// User events
export {
  trackSignUp,
  trackLogin,
  trackLogout,
  trackProfileUpdate,
  trackSettingsChange,
} from "./user"

