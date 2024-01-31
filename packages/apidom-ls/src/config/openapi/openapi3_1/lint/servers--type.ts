import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../target-specs';

const serversTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_SERVERS_TYPE,
  source: 'apilint',
  message: 'servers must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['servers']],
  marker: 'value',
  target: 'servers',
  data: {},
  targetSpecs: OpenAPI31,
};

export default serversTypeLint;
