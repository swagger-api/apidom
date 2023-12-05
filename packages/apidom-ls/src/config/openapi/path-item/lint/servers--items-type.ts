import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const serversItemsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PATH_ITEM_FIELD_SERVERS_ITEMS_TYPE,
  source: 'apilint',
  message: 'servers must be an array of Server Objects',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['server']],
  marker: 'key',
  target: 'servers',
  data: {},
  targetSpecs: OpenAPI3,
};

export default serversItemsTypeLint;
