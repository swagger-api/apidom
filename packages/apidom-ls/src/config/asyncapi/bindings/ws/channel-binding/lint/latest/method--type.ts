import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const methodTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_WEB_SOCKET_CHANNEL_BINDING_FIELD_METHOD_TYPE,
  source: 'apilint',
  message: "'method' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'method',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default methodTypeLint;
