import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../../../target-specs.ts';

const deliveryPolicyTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SNS_OPERATION_BINDING_FIELD_DELIVERY_POLICY_TYPE,
  source: 'apilint',
  message: "'deliveryPolicy' value must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'deliveryPolicy',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default deliveryPolicyTypeLint;
