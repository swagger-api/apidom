import type LoggingLevel from './LoggingLevel';
import { getLevelName } from './LoggingLevel';

export interface LogRecordInstance<T extends Error = Error> {
  readonly name: string;
  readonly message: string;
  readonly levelname: string;
  readonly levelno: number;
  readonly process?: number;
  readonly processName?: string;
  readonly error?: T;
  [key: string]: unknown;
}

export interface LogRecordConstructor<T extends Error = Error> {
  new (
    name: string,
    level: LoggingLevel,
    message: string,
    error?: T,
    extra?: Record<string, unknown>,
  ): LogRecordInstance<T>;
}

class LogRecord<T extends Error = Error> implements LogRecordInstance<T> {
  public readonly name: string;

  public readonly levelname: string;

  public readonly levelno: number;

  public readonly message: string;

  public readonly process?: number;

  public readonly processName?: string;

  public readonly error?: T;

  [key: string]: unknown;

  constructor(
    name: string,
    level: LoggingLevel,
    message: string,
    error?: T,
    extra?: Record<string, unknown>,
  ) {
    this.name = name;
    this.levelno = level;
    this.levelname = getLevelName(level);
    this.message = message;
    this.error = error;

    if (globalThis.process?.pid) {
      this.process = globalThis.process.pid;
      this.processName = globalThis.process.title;
    }

    if (extra) {
      Object.assign(this, extra);
    }
  }
}

let logRecordClass: LogRecordConstructor = LogRecord;

export const setLogRecordClass = (cls: LogRecordConstructor) => {
  logRecordClass = cls;
};

export const getLogRecordClass = (): LogRecordConstructor => logRecordClass;

export default LogRecord;
