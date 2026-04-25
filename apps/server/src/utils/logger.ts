// Simple logging utility with environment-aware output
// Logs are formatted with severity level prefixes for easy filtering
const isDev = process.env.NODE_ENV === "development";

// Logger object with methods for different severity levels
// debug() only logs in development environment
export const logger = {
  info: (...args: unknown[]) => {
    console.log("[INFO]", ...args);
  },
  error: (...args: unknown[]) => {
    console.error("[ERROR]", ...args);
  },
  warn: (...args: unknown[]) => {
    console.warn("[WARN]", ...args);
  },
  debug: (...args: unknown[]) => {
    if (isDev) {
      console.debug("[DEBUG]", ...args);
    }
  },
};
