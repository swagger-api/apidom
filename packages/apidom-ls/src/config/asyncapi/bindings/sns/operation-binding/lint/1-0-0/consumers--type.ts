import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../../../../target-specs.ts';

const consumersTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SNS_OPERATION_BINDING_FIELD_CONSUMERS_TYPE,
  source: 'apilint',
  message: "'consumers' value must be an array",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['array'],
  marker: 'value',
  target: 'consumers',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['1.0.0']],
    },
  ],
  targetSpecs: AsyncAPI3,
};

export default consumersTypeLint;
