import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const rmwImplementationTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ROS2_SERVER_BINDING_FIELD_RMW_IMPLEMENTATION_TYPE,
  source: 'apilint',
  message: "'rmwImplementation' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'rmwImplementation',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default rmwImplementationTypeLint;
