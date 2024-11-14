import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI31 } from '../../../openapi/target-specs.ts';

const exclusiveMinimumPatternLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_EXCLUSIVEMINUMUM,
  source: 'apilint',
  message: 'exclusiveMinimum value must be a number',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^-?\\d*\\.{0,1}\\d+$', 'number'],
  marker: 'value',
  target: 'exclusiveMinimum',
  data: {},
  targetSpecs: [...AsyncAPI2, ...OpenAPI31],
};

export default exclusiveMinimumPatternLint;
