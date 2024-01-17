import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs';

const allOfTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ALLOF,
  source: 'apilint',
  message: 'allOf must be a non-empty array of schemas',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['schema'], true],
  marker: 'key',
  target: 'allOf',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default allOfTypeLint;
