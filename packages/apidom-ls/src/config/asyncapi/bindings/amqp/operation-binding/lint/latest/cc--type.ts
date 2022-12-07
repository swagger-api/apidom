import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const ccTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_AMQP_OPERATION_BINDING_FIELD_CC_TYPE,
  source: 'apilint',
  message: "'cc' must be an array of strings",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'key',
  target: 'cc',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default ccTypeLint;
