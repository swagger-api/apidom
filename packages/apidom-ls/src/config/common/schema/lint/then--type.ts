import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs';

const thenTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_THEN,
  source: 'apilint',
  message: '"then" must be a schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'then',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default thenTypeLint;
