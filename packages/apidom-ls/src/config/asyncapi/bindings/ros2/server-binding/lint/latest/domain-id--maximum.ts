import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const domainIdMaximumLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ROS2_SERVER_BINDING_FIELD_DOMAIN_ID_MAXIMUM,
  source: 'apilint',
  message: "'domainId' value must be less than 232",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintMaximum',
  linterParams: [231],
  marker: 'value',
  target: 'domainId',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
    {
      targets: [{ path: 'domainId' }],
      function: 'apilintElementOrClass',
      params: [['number']],
    },
  ],
};

export default domainIdMaximumLint;
