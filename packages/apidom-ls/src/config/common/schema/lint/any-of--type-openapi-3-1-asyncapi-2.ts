import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI31 } from '../../../openapi/target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const anyOfTypeOpenAPI3_1_AsyncAPI2Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ANYOF,
  source: 'apilint',
  message: 'anyOf must be a non-empty array of schemas',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['schema', 'boolean'], true],
  marker: 'key',
  target: 'anyOf',
  data: {},
  targetSpecs: [...OpenAPI31, ...AsyncAPI2],
};

export default anyOfTypeOpenAPI3_1_AsyncAPI2Lint;
