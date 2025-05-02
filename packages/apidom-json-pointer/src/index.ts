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
   * Compiling
   */
  compile,
  /**
   * Escaping
   */
  escape,
  unescape,
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
 * Evaluation
 */
export { evaluate } from '@swaggerexpert/json-pointer/evaluate/realms/apidom';
export type * from '@swaggerexpert/json-pointer';
