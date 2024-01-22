import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs';

const exclusiveMaximumTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_EXCLUSIVEMAXIMUM,
  source: 'apilint',
  message: 'exclusiveMaximum value must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'exclusiveMaximum',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default exclusiveMaximumTypeLint;
