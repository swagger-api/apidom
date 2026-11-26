import { evaluate as baseEvaluate } from '@swaggerexpert/json-pointer';
import type { EvaluationOptions, JSONPointer } from '@swaggerexpert/json-pointer';

import ApiDOMEvaluationRealm from './ApiDOMEvaluationRealm.ts';

/**
 * @public
 */
export type ApiDOMRealmEvaluationOptions = Omit<EvaluationOptions, 'realm'>;

/**
 * Evaluates JSON Pointer against ApiDOM element.
 * @public
 */
const evaluate = <T = unknown>(
  value: unknown,
  jsonPointer: JSONPointer,
  options: ApiDOMRealmEvaluationOptions = {},
): T => baseEvaluate<T>(value, jsonPointer, { ...options, realm: new ApiDOMEvaluationRealm() });

export default evaluate;
