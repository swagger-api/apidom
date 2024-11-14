import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const typeEqualsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_MESSAGE_BINDING_FIELD_TYPE_EQUALS,
  source: 'apilint',
  message: "'qos' must be one of allowed values",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['string', 'jms', 'binary']],
  marker: 'value',
  target: 'qos',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default typeEqualsLint;
