import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../../../target-specs.ts';

const consumersRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SNS_OPERATION_BINDING_FIELD_CONSUMERS_REQUIRED,
  source: 'apilint',
  message: "should always have a 'consumers'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['consumers'],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'consumers' field",
        action: 'addChild',
        snippetYaml: 'consumers:\n  - \n  ',
        snippetJson: '"consumers": [],\n    ',
      },
    ],
  },
  targetSpecs: AsyncAPI2,
};

export default consumersRequiredLint;
