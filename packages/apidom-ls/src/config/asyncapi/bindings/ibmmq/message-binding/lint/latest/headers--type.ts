import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const headersTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_MESSAGE_BINDING_FIELD_HEADERS_TYPE,
  source: 'apilint',
  message: "'headers' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
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
