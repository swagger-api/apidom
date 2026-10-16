import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const domainIdTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ROS2_SERVER_BINDING_FIELD_DOMAIN_ID_TYPE,
  source: 'apilint',
  message: "'domainId' value must be a positive integer (zero included)",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'domainId',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default domainIdTypeLint;
