// eslint-disable-next-line import/prefer-default-export
import { LogLevel } from '../src/apidom-language-types';

export function printJson(json: unknown) {
  console.log(JSON.stringify(json, null, 2));
}

export const logPerformance = false;
export const logLevel = LogLevel.WARN;
