import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const orderingKeyTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_GOOGLEPUBSUB_MESSAGE_BINDING_FIELD_ORDERING_KEY_TYPE,
  source: 'apilint',
  message: "'orderingKey' value must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'orderingKey',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default orderingKeyTypeLint;
