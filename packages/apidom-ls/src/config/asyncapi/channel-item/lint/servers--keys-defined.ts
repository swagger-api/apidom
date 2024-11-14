import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const serversKeysDefinedLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_ITEM_FIELD_SERVERS_KEYS_DEFINED,
  target: 'servers',
  source: 'apilint',
  message: 'server names must be included in defined servers',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementKeysIncluded',
  linterParams: ['servers'],
  markerTarget: 'servers',
  marker: 'key',
  data: {},
};

export default serversKeysDefinedLint;
