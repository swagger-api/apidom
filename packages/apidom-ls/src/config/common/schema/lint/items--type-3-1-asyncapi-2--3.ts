import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI31 } from '../../../openapi/target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const itemsTypeOpenAPI31AsyncAPI2__3Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ITEMS,
  source: 'apilint',
  message: 'items must be a schema or array of schemas',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'array']],
  marker: 'value',
  target: 'items',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3, ...OpenAPI31],
};

export default itemsTypeOpenAPI31AsyncAPI2__3Lint;
