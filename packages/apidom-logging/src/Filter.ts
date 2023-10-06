import type { LogRecordInstance } from './LogRecord';

export interface FilterInstance {
  readonly name: string;
  filter(record: LogRecordInstance): boolean | LogRecordInstance;
}

export type FilterFunction = (record: LogRecordInstance) => boolean | LogRecordInstance;

class Filter implements FilterInstance {
  public readonly name: string;

  constructor(name: string = '') {
    this.name = name;
  }

  public filter(record: LogRecordInstance): boolean {
    if (this.name.length === 0 || this.name === record.name) {
      return true;
    }
    if (!record.name.startsWith(this.name)) {
      return false;
    }

    return record.name[this.name.length] === '.';
  }
}

export default Filter;
