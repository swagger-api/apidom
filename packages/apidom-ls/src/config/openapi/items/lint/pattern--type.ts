import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const patternTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_ITEMS_FIELD_PATTERN_TYPE,
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
