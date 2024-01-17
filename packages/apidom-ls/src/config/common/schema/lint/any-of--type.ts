import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs';

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
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default anyOfTypeLint;
