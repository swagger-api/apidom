import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const expiryTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_MESSAGE_BINDING_FIELD_EXPIRY_TYPE,
  source: 'apilint',
  message: "'expiry' value must be a positive integer (zero included)",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'expiry',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default expiryTypeLint;
