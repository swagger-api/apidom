import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const serversTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_CHANNEL_FIELD_SERVERS_TYPE,
  source: 'apilint',
  message: "'servers' must be an array",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['server', 'channel-servers']],
  marker: 'key',
  markerTarget: 'servers',
  target: 'servers',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default serversTypeLint;
