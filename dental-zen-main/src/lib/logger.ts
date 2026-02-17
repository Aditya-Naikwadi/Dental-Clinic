/**
 * Production-safe logging utility
 * Logs are only shown in development mode
 * In production, logs can be sent to monitoring services
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
    level: LogLevel;
    message: string;
    data?: unknown;
    timestamp: string;
}

class Logger {
    private isDevelopment = import.meta.env.DEV;

    private formatMessage(level: LogLevel, message: string, data?: unknown): LogEntry {
        return {
            level,
            message,
            data,
            timestamp: new Date().toISOString(),
        };
    }

    private sendToMonitoring(entry: LogEntry): void {
        // In production, send to monitoring service
        // Example: Sentry, LogRocket, DataDog, etc.
        // monitoringService.log(entry);
        void entry; // Placeholder for future monitoring integration
    }

    info(message: string, data?: unknown): void {
        if (this.isDevelopment) {
            console.info(`[INFO] ${message}`, data || "");
        } else {
            const entry = this.formatMessage("info", message, data);
            this.sendToMonitoring(entry);
        }
    }

    warn(message: string, data?: unknown): void {
        if (this.isDevelopment) {
            console.warn(`[WARN] ${message}`, data || "");
        } else {
            const entry = this.formatMessage("warn", message, data);
            this.sendToMonitoring(entry);
        }
    }

    error(message: string, error?: unknown): void {
        if (this.isDevelopment) {
            console.error(`[ERROR] ${message}`, error || "");
        } else {
            const entry = this.formatMessage("error", message, error);
            this.sendToMonitoring(entry);
        }
    }

    debug(message: string, data?: unknown): void {
        if (this.isDevelopment) {
            console.debug(`[DEBUG] ${message}`, data || "");
        }
        // Debug logs typically not sent to production monitoring
    }
}

// Export singleton instance
export const logger = new Logger();
