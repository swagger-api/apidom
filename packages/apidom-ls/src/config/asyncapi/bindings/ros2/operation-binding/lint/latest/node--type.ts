import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const nodeTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ROS2_OPERATION_BINDING_FIELD_NODE_TYPE,
  source: 'apilint',
  message: "'node' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'node',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default nodeTypeLint;
