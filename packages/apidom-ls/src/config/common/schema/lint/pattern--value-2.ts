import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../../openapi/target-specs.ts';

const patternValueLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PATTERN_REG_EXP_ANCHORS,
  source: 'apilint',
  message: '\\Z" anchors are not allowed in regular expression patterns',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^(?!.*\\\\Z).*$'],
  marker: 'value',
  target: 'pattern',
  data: {},
  targetSpecs: OpenAPI2,
};

export default patternValueLint;
