import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI31 } from '../../../openapi/target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allOfTypeOpenAPI3_1__AsyncAPI2__3Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ALLOF,
  source: 'apilint',
  message: 'allOf must be a non-empty array of schema objects or boolean JSON schemas',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['schema', 'boolean'], true],
  marker: 'key',
  target: 'allOf',
  data: {},
  targetSpecs: [...OpenAPI31, ...AsyncAPI2, ...AsyncAPI3],
};

export default allOfTypeOpenAPI3_1__AsyncAPI2__3Lint;
