import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const descriptionRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_RESPONSE_FIELD_DESCRIPTION_REQUIRED,
  source: 'apilint',
  message: "should always have a 'description'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['description'],
  marker: 'key',
  data: {
    quickFix: [
      {
        message: "add 'description' field",
        action: 'addChild',
        snippetYaml: 'description: \n  ',
        snippetJson: '"description": "",\n    ',
      },
    ],
  },
  conditions: [
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default descriptionRequiredLint;
