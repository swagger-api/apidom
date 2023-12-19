import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const deprecatedTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_OPERATION_FIELD_DEPRECATED_TYPE,
  source: 'apilint',
  message: 'deprecated must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'deprecated',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default deprecatedTypeLint;
