import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const parametersTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_NAME_UNIQUE,
  source: 'apilint',
  message: 'Name must be unique among all parameters',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintPropertyUniqueValue',
  linterParams: [['parameters'], 'name'],
  marker: 'key',
  markerTarget: 'name',
  target: 'name',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default parametersTypeLint;
