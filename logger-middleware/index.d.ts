interface LogEntry {
    logID: string;
    timestamp: string;
    stack: 'backend' | 'frontend';
    level: 'info' | 'warn' | 'error' | 'debug';
    package: string;
    message: string;
    [key: string]: any;
}
export declare class Logger {
    private static instance;
    private logs;
    private constructor();
    static getInstance(): Logger;
    private generateLogId;
    private log;
    info(stack: LogEntry['stack'], pkg: string, message: string, context?: object): void;
    warn(stack: LogEntry['stack'], pkg: string, message: string, context?: object): void;
    error(stack: LogEntry['stack'], pkg: string, message: string, context?: object): void;
    debug(stack: LogEntry['stack'], pkg: string, message: string, context?: object): void;
    getLogs(): LogEntry[];
    clearLogs(): void;
}
export declare const logger: Logger;
export {};
