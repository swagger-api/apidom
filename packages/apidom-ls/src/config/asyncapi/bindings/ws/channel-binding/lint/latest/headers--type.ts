import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const headersTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_WEB_SOCKET_CHANNEL_BINDING_FIELD_HEADERS_TYPE,
  source: 'apilint',
  message: 'headers must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema']],
  marker: 'value',
  target: 'headers',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default headersTypeLint;
