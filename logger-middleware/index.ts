interface LogEntry {
  logID: string;
  timestamp: string;
  stack: 'backend' | 'frontend';
  level: 'info' | 'warn' | 'error' | 'debug';
  package: string;
  message: string;
  [key: string]: any; // Additional context
}

export class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private generateLogId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private log(level: LogEntry['level'], stack: LogEntry['stack'], pkg: string, message: string, context: object = {}): void {
    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = {
      logID: this.generateLogId(),
      timestamp,
      stack,
      level,
      package: pkg,
      message,
      ...context
    };

    this.logs.push(logEntry);
    console.log(JSON.stringify(logEntry, null, 2)); // Print to console as required
  }

  public info(stack: LogEntry['stack'], pkg: string, message: string, context: object = {}): void {
    this.log('info', stack, pkg, message, context);
  }

  public warn(stack: LogEntry['stack'], pkg: string, message: string, context: object = {}): void {
    this.log('warn', stack, pkg, message, context);
  }

  public error(stack: LogEntry['stack'], pkg: string, message: string, context: object = {}): void {
    this.log('error', stack, pkg, message, context);
  }

  public debug(stack: LogEntry['stack'], pkg: string, message: string, context: object = {}): void {
    this.log('debug', stack, pkg, message, context);
  }

  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }
}

export const logger = Logger.getInstance();