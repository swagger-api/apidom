import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30 } from '../../../openapi/target-specs.ts';

const anyOfTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ANYOF,
  source: 'apilint',
  message: 'anyOf must be a non-empty array of schemas',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['schema'], true],
  marker: 'key',
  target: 'anyOf',
  data: {},
  targetSpecs: OpenAPI30,
};

export default anyOfTypeLint;
