import { assert } from 'chai';
import Ajv2020Module from 'ajv/dist/2020.js';
import AjvDraft04Module from 'ajv-draft-04';
import { ObjectElement, toValue } from '@swagger-api/apidom-core';

import downgradeSchema, {
  createWarnings,
} from '../../../../src/strategies/json-schema-2020-12-to-openapi-3-0/downgrade/index.ts';

/**
 * Values used to compare what the input (JSON Schema 2020-12) and the output (Draft 4 with the
 * OpenAPI `nullable` keyword) accept.
 */
export const VALUE_POOL: unknown[] = [
  null,
  true,
  false,
  0,
  -1,
  4,
  5,
  5.5,
  6,
  10,
  '',
  'x',
  'test',
  'a@b.c',
  [],
  [1],
  ['a', 'a'],
  ['a', 1],
  {},
  { A: 1 },
  { A: 1, B: 1 },
  { A: 2 },
  { A: 2, C: 1 },
  { A: 1, C: 1 },
  { license: 'x' },
  { license: 'x', age: 3 },
  { license: 'x', age: '3' },
  { age: 1 },
  { foo: 1 },
  { 'x-a': 1 },
];

const defaultExport = (module: any) => module.default ?? module;
const Ajv2020 = defaultExport(Ajv2020Module);
const AjvDraft04 = defaultExport(AjvDraft04Module);

const compile2020 = (schema: unknown) =>
  new Ajv2020({ strict: false, validateFormats: false }).compile(schema as object);
const compileDraft04 = (schema: unknown) =>
  new AjvDraft04({ strict: false, validateFormats: false }).compile(schema as object);

export const downgrade = (input: unknown) => {
  const warnings = createWarnings();
  const output = toValue(
    downgradeSchema(new ObjectElement(input as Record<string, unknown>), warnings),
  );

  return { output, warnings: warnings.annotations };
};

/**
 * Asserts that the downgraded schema accepts exactly the values the input accepts.
 */
export const assertSameMeaning = (input: unknown, output: unknown): void => {
  const validateInput = compile2020(input);
  const validateOutput = compileDraft04(output);
  const differences = VALUE_POOL.filter((value) => validateInput(value) !== validateOutput(value));

  assert.deepEqual(differences, [], 'input and output accept different values');
};

/**
 * Asserts that the downgraded schema accepts every value the input accepts (it may accept more).
 */
export const assertNeverStricter = (input: unknown, output: unknown): void => {
  const validateInput = compile2020(input);
  const validateOutput = compileDraft04(output);
  const rejected = VALUE_POOL.filter((value) => validateInput(value) && !validateOutput(value));

  assert.deepEqual(rejected, [], 'output rejects values the input accepts');
};

/**
 * Asserts the doc example: the exact output, the same meaning, and no warnings.
 */
export const assertLosslessRule = (input: unknown, expected: unknown): void => {
  const { output, warnings } = downgrade(input);

  assert.deepEqual(output, expected);
  assertSameMeaning(input, output);
  assert.lengthOf(warnings, 0);
};
