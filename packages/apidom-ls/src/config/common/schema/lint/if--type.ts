import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../../openapi/target-specs';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';

const ifTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_IF,
  source: 'apilint',
  message: '"if" must be a schema object or a boolean JSON schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'boolean']],
  marker: 'value',
  target: 'if',
  data: {},
  targetSpecs: [...OpenAPI31, ...AsyncAPI2],
};

export default ifTypeLint;
