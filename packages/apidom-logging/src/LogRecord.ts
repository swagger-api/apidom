import type LoggingLevel from './LoggingLevel';
import { getLevelName } from './LoggingLevel';

const startTime: number = Date.now();

export interface LogRecordInstance<T extends Error = Error> {
  readonly name: string;
  readonly message: string;
  readonly created: number;
  readonly msecs: number;
  readonly relativeCreated: number;
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

  public readonly created: number;

  public readonly msecs: number;

  public readonly relativeCreated: number;

  public asctime?: string;

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
    const created = Date.now();

    this.name = name;
    this.levelno = level;
    this.levelname = getLevelName(level);
    this.message = message;
    this.error = error;
    this.created = created;
    this.msecs = Math.floor(created / 1000) - this.created * 1000;
    this.relativeCreated = created - startTime;

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
