import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const serversTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PATH_ITEM_FIELD_SERVERS_TYPE,
  source: 'apilint',
  message: 'servers must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['path-item-servers']],
  marker: 'value',
  target: 'servers',
  data: {},
  targetSpecs: OpenAPI3,
};

export default serversTypeLint;
