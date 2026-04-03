import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../../../target-specs.ts';

const orderingTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SNS_CHANNEL_BINDING_FIELD_ORDERING_TYPE,
  source: 'apilint',
  message: "'ordering' value must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'ordering',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default orderingTypeLint;
