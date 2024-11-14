import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI31 } from '../../../openapi/target-specs.ts';

const elseTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ELSE,
  source: 'apilint',
  message: '"else" must be a schema object or a boolean JSON schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'boolean']],
  marker: 'value',
  target: 'else',
  data: {},
  targetSpecs: [...OpenAPI31, ...AsyncAPI2],
};

export default elseTypeLint;
