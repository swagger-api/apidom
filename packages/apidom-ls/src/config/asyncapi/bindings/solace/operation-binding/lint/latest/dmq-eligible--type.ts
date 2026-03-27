import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const dmqEligibleTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SOLACE_OPERATION_BINDING_FIELD_DMQ_ELIGIBLE_TYPE,
  source: 'apilint',
  message: "'dmqEligible' value must be a boolean",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'dmqEligible',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default dmqEligibleTypeLint;
