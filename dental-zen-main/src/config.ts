/**
 * Application Configuration
 * Centralized configuration with environment variables
 */

interface AppConfig {
    apiUrl: string;
    environment: "development" | "staging" | "production";
    enableAnalytics: boolean;
    sentryDsn?: string;
    isDevelopment: boolean;
    isProduction: boolean;
}

function getConfig(): AppConfig {
    const environment = (import.meta.env.VITE_ENVIRONMENT || "development") as AppConfig["environment"];

    return {
        apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
        environment,
        enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
        sentryDsn: import.meta.env.VITE_SENTRY_DSN,
        isDevelopment: environment === "development",
        isProduction: environment === "production",
    };
}

// Validate required environment variables
function validateConfig(config: AppConfig): void {
    if (config.isProduction && !config.apiUrl) {
        throw new Error("VITE_API_URL is required in production");
    }
}

const config = getConfig();
validateConfig(config);

export default config;
