import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const headersTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_HTTP_MESSAGE_BINDING_FIELD_HEADERS_TYPE,
  source: 'apilint',
  message: 'headers must be an object or a boolean JSON schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'boolean']],
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
