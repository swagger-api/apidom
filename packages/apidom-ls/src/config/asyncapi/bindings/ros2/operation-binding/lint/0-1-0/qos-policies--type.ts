import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const qosPoliciesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ROS2_OPERATION_BINDING_FIELD_QOS_POLICIES_TYPE,
  source: 'apilint',
  message: "'qosPolicies' value must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'qosPolicies',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default qosPoliciesTypeLint;
