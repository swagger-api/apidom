import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

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
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default msgVpnTypeLint;
