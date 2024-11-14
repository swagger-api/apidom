import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const itemsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_ITEMS_TYPE,
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
