export {
  /**
   * Representation
   */
  JSONString,
  URIFragmentIdentifier,
  /**
   * Parsing
   */
  parse,
  CSTTranslator,
  ASTTranslator,
  XMLTranslator,
  /**
   * Testing
   */
  testJSONPointer,
  testReferenceToken,
  testArrayLocation,
  testArrayIndex,
  testArrayDash,
  /**
   * Compiling
   */
  compile,
  /**
   * Escaping
   */
  escape,
  unescape,
  /**
   * Grammar
   */
  Grammar,
  /**
   * Errors
   */
  JSONPointerError,
  JSONPointerParseError,
  JSONPointerCompileError,
  JSONPointerEvaluateError,
  JSONPointerTypeError,
  JSONPointerKeyError,
  JSONPointerIndexError,
} from '@swaggerexpert/json-pointer';
/**
 * Contextual Evaluation for ApiDOM
 */
export { default as evaluate } from './evaluate.ts';
export type { ApiDOMRealmEvaluationOptions } from './evaluate.ts';
/**
 * Re-export all types
 */
export type * from '@swaggerexpert/json-pointer';
