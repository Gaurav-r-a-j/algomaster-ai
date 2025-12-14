export const MESSAGES = {
  SUCCESS: {
    LOGIN: "Login successful",
    LOGOUT: "Logout successful",
    REGISTER: "Registration successful",
    UPDATE: "Update successful",
    DELETE: "Delete successful",
  },
  ERROR: {
    GENERIC: "Something went wrong. Please try again.",
    NETWORK: "Network error. Please check your connection.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    NOT_FOUND: "The requested resource was not found.",
    VALIDATION: "Please check your input and try again.",
  },
  VALIDATION: {
    REQUIRED: "This field is required",
    EMAIL: "Please enter a valid email address",
    MIN_LENGTH: "Minimum length not met",
    MAX_LENGTH: "Maximum length exceeded",
  },
} as const
