import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI31 } from '../../../openapi/target-specs.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';

const thenTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_THEN,
  source: 'apilint',
  message: '"then" must be a schema object or a boolean JSON schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'boolean']],
  marker: 'value',
  target: 'then',
  data: {},
  targetSpecs: [...OpenAPI31, ...AsyncAPI2, ...AsyncAPI3],
};

export default thenTypeLint;
