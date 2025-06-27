"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
class Logger {
    static instance;
    logs = [];
    constructor() { }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    generateLogId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    log(level, stack, pkg, message, context = {}) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            logID: this.generateLogId(),
            timestamp,
            stack,
            level,
            package: pkg,
            message,
            ...context
        };
        this.logs.push(logEntry);
        console.log(JSON.stringify(logEntry, null, 2));
    }
    info(stack, pkg, message, context = {}) {
        this.log('info', stack, pkg, message, context);
    }
    warn(stack, pkg, message, context = {}) {
        this.log('warn', stack, pkg, message, context);
    }
    error(stack, pkg, message, context = {}) {
        this.log('error', stack, pkg, message, context);
    }
    debug(stack, pkg, message, context = {}) {
        this.log('debug', stack, pkg, message, context);
    }
    getLogs() {
        return [...this.logs];
    }
    clearLogs() {
        this.logs = [];
    }
}
exports.Logger = Logger;
exports.logger = Logger.getInstance();
//# sourceMappingURL=index.js.map