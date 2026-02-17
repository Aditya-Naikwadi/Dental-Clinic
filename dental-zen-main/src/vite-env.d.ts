/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_ENVIRONMENT: "development" | "staging" | "production";
    readonly VITE_ENABLE_ANALYTICS: string;
    readonly VITE_SENTRY_DSN?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
