import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

// In AsyncAPI 3.0.0, Parameter Object does not have a 'schema' field
// The 'default' field is always of type string
// See: https://www.asyncapi.com/docs/reference/specification/v3.0.0#parameterObject
const defaultTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_PARAMETER_FIELD_DEFAULT_TYPE,
  source: 'apilint',
  message: "'default' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'default',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default defaultTypeLint;
