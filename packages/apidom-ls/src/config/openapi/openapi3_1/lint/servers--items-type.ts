import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../target-specs';

const serverItemsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_SERVERS_ITEMS_TYPE,
  source: 'apilint',
  message: 'servers must be an array of Server Objects',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['server']],
  marker: 'key',
  target: 'servers',
  data: {},
  targetSpecs: OpenAPI31,
};

export default serverItemsTypeLint;
