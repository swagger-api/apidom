import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const exclusiveMinimumTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_HEADER_FIELD_EXCLUSIVE_MINIMUM_TYPE,
  source: 'apilint',
  message: 'exclusiveMinimum must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'exclusiveMinimum',
  data: {},
  targetSpecs: OpenAPI2,
};

export default exclusiveMinimumTypeLint;
