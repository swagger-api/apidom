import type { LogRecordInstance } from './LogRecord';
import type { FilterFunction, FilterInstance } from './Filter';
import { getLogRecordClass } from './LogRecord';

type Filter = FilterFunction | FilterInstance;

class Filterer {
  protected readonly filters: Filter[] = [];

  public addFilter(filter: Filter) {
    if (!this.filters.includes(filter)) {
      this.filters.push(filter);
    }
  }

  public removeFilter(filter: Filter) {
    const filterIndex = this.filters.indexOf(filter);

    if (filterIndex !== -1) {
      this.filters.splice(filterIndex, 1);
    }
  }

  public filter(record: LogRecordInstance) {
    const LogRecordClass = getLogRecordClass();
    let newRecord: LogRecordInstance = record;

    for (const filter of this.filters) {
      let result: boolean | LogRecordInstance;

      if (typeof filter === 'function') {
        result = filter(record);
      } else {
        result = filter.filter(record);
      }

      if (result === false) return false;
      if (result instanceof LogRecordClass) {
        newRecord = result;
      }
    }

    return newRecord;
  }
}

export default Filterer;
