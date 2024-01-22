import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../../openapi/target-specs';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';

const examplesTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_EXAMPLES,
  source: 'apilint',
  message: 'examples must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArray',
  marker: 'key',
  target: 'examples',
  data: {},
  targetSpecs: [...AsyncAPI2, ...OpenAPI31],
};

export default examplesTypeLint;
