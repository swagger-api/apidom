import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI31 } from '../../../openapi/target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const notTypeOpenAPI3_1_AsyncAPI2Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_NOT,
  source: 'apilint',
  message: '"not" must be a schema object or a boolean JSON schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'boolean']],
  marker: 'value',
  target: 'not',
  data: {},
  targetSpecs: [...OpenAPI31, ...AsyncAPI2],
};

export default notTypeOpenAPI3_1_AsyncAPI2Lint;
