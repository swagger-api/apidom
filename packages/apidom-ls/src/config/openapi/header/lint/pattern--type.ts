import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const patternTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_HEADER_FIELD_PATTERN_TYPE,
  source: 'apilint',
  message: 'pattern must be a string',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'pattern',
  data: {},
  targetSpecs: OpenAPI2,
};

export default patternTypeLint;
