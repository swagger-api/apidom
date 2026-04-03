import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const correlationDataTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_MESSAGE_BINDING_FIELD_CORRELATION_DATA_TYPE,
  source: 'apilint',
  message: "'correlationData' must be a Schema Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema']],
  marker: 'value',
  target: 'correlationData',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default correlationDataTypeLint;
