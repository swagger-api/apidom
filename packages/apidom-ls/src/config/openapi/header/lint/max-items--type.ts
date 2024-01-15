import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

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
