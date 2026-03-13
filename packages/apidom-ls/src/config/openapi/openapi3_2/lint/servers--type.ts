import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const serversTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_OPEN_API_FIELD_SERVERS_TYPE,
  source: 'apilint',
  message: "'servers' must be an array of Server Objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['servers']],
  marker: 'value',
  target: 'servers',
  data: {},
  targetSpecs: OpenAPI32,
};

export default serversTypeLint;
