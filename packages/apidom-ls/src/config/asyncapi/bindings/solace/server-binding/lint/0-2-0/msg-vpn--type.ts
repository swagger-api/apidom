import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const msgVpnTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SOLACE_SERVER_BINDING_FIELD_MSG_VPN_TYPE,
  source: 'apilint',
  message: "'msgVpn' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'msgVpn',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.2.0']],
    },
  ],
};

export default msgVpnTypeLint;
