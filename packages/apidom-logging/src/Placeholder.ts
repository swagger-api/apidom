import type { LoggerInstance } from './Logger';

type LoggerHierarchyInstance = LoggerInstance | PlaceholderInstance;

export interface PlaceholderInstance {
  readonly loggerMap: Map<LoggerHierarchyInstance, LoggerHierarchyInstance | null>;
  append(logger: LoggerHierarchyInstance): void;
}
class Placeholder {
  public readonly loggerMap: Map<LoggerHierarchyInstance, LoggerHierarchyInstance | null>;

  constructor(logger: LoggerHierarchyInstance) {
    this.loggerMap = new Map([[logger, null]]);
  }

  public append(logger: LoggerHierarchyInstance): void {
    if (!this.loggerMap.has(logger)) {
      this.loggerMap.set(logger, null);
    }
  }
}

export default Placeholder;
