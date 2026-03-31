import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../../../target-specs.ts';

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
      params: [['0.2.0']],
    },
  ],
  targetSpecs: AsyncAPI2,
};

export default consumersTypeLint;
