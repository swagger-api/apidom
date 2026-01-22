import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const serversTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ASYNC_API_FIELD_SERVERS_TYPE,
  source: 'apilint',
  message: 'servers must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['servers']],
  marker: 'value',
  target: 'servers',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default serversTypeLint;
