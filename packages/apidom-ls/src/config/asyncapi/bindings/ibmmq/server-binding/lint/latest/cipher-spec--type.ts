import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const cipherSpecTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_SERVER_BINDING_FIELD_CIPHER_SPEC_TYPE,
  source: 'apilint',
  message: "'cipherSpec' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'cipherSpec',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default cipherSpecTypeLint;
