import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const destinationTypeEqualsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_CHANNEL_BINDING_FIELD_DESTINATION_TYPE_EQUALS,
  source: 'apilint',
  message: "'destinationType' must be one of allowed values",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['queue', 'topic']],
  marker: 'value',
  target: 'destinationType',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default destinationTypeEqualsLint;
