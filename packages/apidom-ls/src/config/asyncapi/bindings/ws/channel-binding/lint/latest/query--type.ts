import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const queryTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_WEB_SOCKET_CHANNEL_BINDING_FIELD_QUERY_TYPE,
  source: 'apilint',
  message: 'query must be an object or a boolean JSON schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'boolean']],
  marker: 'value',
  target: 'query',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default queryTypeLint;
