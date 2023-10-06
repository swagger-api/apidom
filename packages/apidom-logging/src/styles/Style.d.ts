import type { LogRecordInstance } from '../LogRecord';

export default interface Style {
  usesTime(): boolean;
  validate(): boolean;
  format(record: LogRecordInstance): string;
}
