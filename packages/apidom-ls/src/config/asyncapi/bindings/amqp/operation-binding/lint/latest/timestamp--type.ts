import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const timestampTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_AMQP_OPERATION_BINDING_FIELD_TIMESTAMP_TYPE,
  source: 'apilint',
  message: "'timestamp' value must be a boolean",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'timestamp',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default timestampTypeLint;
