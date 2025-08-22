import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30, OpenAPI2 } from '../../../openapi/target-specs.ts';

const itemsTypeOpenAPI2OpenAPI30Lint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ITEMS,
  source: 'apilint',
  message: "'items' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['items']],
  marker: 'value',
  target: 'items',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default itemsTypeOpenAPI2OpenAPI30Lint;
