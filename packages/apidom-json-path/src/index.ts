import './polyfills.ts';

export { default as EvaluationJsonPathError } from './errors/EvaluationJsonPathError.ts';
export type { EvaluationJsonPathErrorOptions } from './errors/EvaluationJsonPathError.ts';
export { default as MultiEvaluationJsonPathError } from './errors/MultiEvaluationJsonPathError.ts';
export type { MultiEvaluationJsonPathErrorOptions } from './errors/MultiEvaluationJsonPathError.ts';
export type { default as JsonPathError } from './errors/JsonPathError.ts';
export { default as evaluate } from './evaluate.ts';
export type { Evaluate } from './evaluate.ts';
export { default as evaluateMulti } from './evaluate-multi.ts';
export type { EvaluateMulti, JSONPathEvalTuple } from './evaluate-multi.ts';
