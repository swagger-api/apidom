import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs';

const elseTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ELSE,
  source: 'apilint',
  message: '"else" must be a schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'else',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default elseTypeLint;
