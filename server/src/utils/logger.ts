export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
}

const colors = {
  reset: "\x1b[0m",
  timestamp: "\x1b[90m", // Gray
  INFO: "\x1b[36m",      // Cyan
  WARN: "\x1b[33m",      // Yellow
  ERROR: "\x1b[31m",     // Red
  DEBUG: "\x1b[35m",     // Magenta
};

function formatMetadata(meta?: any): string {
  if (meta === undefined || meta === null) return "";
  if (meta instanceof Error) return `\n${meta.stack || meta.message}`;
  if (typeof meta === "object") {
    try {
      return ` | ${JSON.stringify(meta)}`;
    } catch {
      return ` | ${String(meta)}`;
    }
  }
  return ` | ${String(meta)}`;
}

class Logger {
  private log(level: LogLevel, message: string, meta?: any) {
    const timestamp = new Date().toISOString();
    const color = colors[level] || colors.reset;
    const levelStr = `${color}[${level.padEnd(5)}]${colors.reset}`;
    const timeStr = `${colors.timestamp}[${timestamp}]${colors.reset}`;
    const metaStr = formatMetadata(meta);

    const logLine = `${timeStr} ${levelStr} ${message}${metaStr}`;

    if (level === LogLevel.ERROR) {
      console.error(logLine);
    } else if (level === LogLevel.WARN) {
      console.warn(logLine);
    } else {
      console.log(logLine);
    }
  }

  info(message: string, meta?: any) {
    this.log(LogLevel.INFO, message, meta);
  }

  warn(message: string, meta?: any) {
    this.log(LogLevel.WARN, message, meta);
  }

  error(message: string, meta?: any) {
    this.log(LogLevel.ERROR, message, meta);
  }

  debug(message: string, meta?: any) {
    this.log(LogLevel.DEBUG, message, meta);
  }
}

export const logger = new Logger();
