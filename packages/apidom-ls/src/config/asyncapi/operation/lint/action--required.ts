import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const actionRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_FIELD_ACTION_REQUIRED,
  source: 'apilint',
  message: "should always have an 'action'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['action'],
  marker: 'key',
  conditions: [
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'action' field",
        action: 'addChild',
        snippetYaml: 'action: \n  ',
        snippetJson: '"action": "",\n',
      },
    ],
  },
  targetSpecs: AsyncAPI3,
};

export default actionRequiredLint;
