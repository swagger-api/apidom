import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const queueMaxLengthLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_NATS_OPERATION_BINDING_FIELD_QUEUE_MAX_LENGTH,
  source: 'apilint',
  message: "'queue' value must not exceed 255 characters",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintMaxLength',
  linterParams: [255],
  marker: 'value',
  target: 'queue',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default queueMaxLengthLint;
