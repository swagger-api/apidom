import type { LogRecordInstance } from '../LogRecord';

interface Style {
  readonly fmt: string | ((value: Record<string, unknown>) => string);
  usesTime(): boolean;
  validate(): boolean;
  format(record: LogRecordInstance): string;
}

export default Style;
