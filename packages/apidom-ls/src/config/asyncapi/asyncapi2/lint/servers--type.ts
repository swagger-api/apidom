import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../target-specs.ts';

const serversTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_ASYNC_API_FIELD_SERVERS_TYPE,
  source: 'apilint',
  message: 'servers must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['servers']],
  marker: 'value',
  target: 'servers',
  data: {},
  targetSpecs: AsyncAPI2,
};

export default serversTypeLint;
