import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs.ts';

const itemsRequiredLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ITEMS_REQUIRED,
  source: 'apilint',
  message: "should have an 'items' if 'type'=array",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['items'],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      params: ['array'],
    },
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'items' field",
        action: 'addChild',
        snippetYaml: 'items: \n  \n',
        snippetJson: '"items": {\n  \n  },\n',
      },
    ],
  },
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default itemsRequiredLint;
