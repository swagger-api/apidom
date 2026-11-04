import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const oneOfTypeAsyncAPI2__3Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ONEOF,
  source: 'apilint',
  message: 'oneOf must be a non-empty array of schema objects or boolean JSON schemas',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['schema', 'boolean'], true],
  marker: 'key',
  target: 'oneOf',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default oneOfTypeAsyncAPI2__3Lint;
