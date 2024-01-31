import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const itemsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_HEADER_FIELD_ITEMS_TYPE,
  source: 'apilint',
  message: "'items' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['items']],
  marker: 'value',
  target: 'items',
  data: {},
  targetSpecs: OpenAPI2,
};

export default itemsTypeLint;
