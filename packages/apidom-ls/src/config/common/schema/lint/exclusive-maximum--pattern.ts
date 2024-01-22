import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI31 } from '../../../openapi/target-specs';

const exclusiveMaximumPatternLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_EXCLUSIVEMAXIMUM,
  source: 'apilint',
  message: 'exclusiveMaximum value must be a number',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^-?\\d*\\.{0,1}\\d+$', 'number'],
  marker: 'value',
  target: 'exclusiveMaximum',
  data: {},
  targetSpecs: [...AsyncAPI2, ...OpenAPI31],
};

export default exclusiveMaximumPatternLint;
