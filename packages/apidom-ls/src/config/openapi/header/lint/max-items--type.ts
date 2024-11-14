import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const maxItemsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_HEADER_FIELD_MAX_ITEMS_TYPE,
  source: 'apilint',
  message: 'maxItems must be a non-negative integer',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'maxItems',
  data: {},
  targetSpecs: OpenAPI2,
};

export default maxItemsTypeLint;
