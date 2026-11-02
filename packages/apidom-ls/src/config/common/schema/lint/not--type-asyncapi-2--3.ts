import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const notTypeAsyncAPI2__3Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_NOT,
  source: 'apilint',
  message: '"not" must be a schema object or a boolean JSON schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'boolean']],
  marker: 'value',
  target: 'not',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default notTypeAsyncAPI2__3Lint;
