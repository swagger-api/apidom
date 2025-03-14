import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI31 } from '../../../openapi/target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const anyOfTypeOpenAPI3_1__AsyncAPI2Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ANYOF,
  source: 'apilint',
  message: 'anyOf must be a non-empty array of schema objects or boolean JSON schemas',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['schema', 'boolean'], true],
  marker: 'key',
  target: 'anyOf',
  data: {},
  targetSpecs: [...OpenAPI31, ...AsyncAPI2],
};

export default anyOfTypeOpenAPI3_1__AsyncAPI2Lint;
