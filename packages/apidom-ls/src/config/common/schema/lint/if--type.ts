import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs';

const ifTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_IF,
  source: 'apilint',
  message: 'if must be a schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'if',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default ifTypeLint;
