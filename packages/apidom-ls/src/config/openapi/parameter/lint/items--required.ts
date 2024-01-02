import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const itemsRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_ITEMS_REQUIRED,
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
  targetSpecs: OpenAPI2,
};

export default itemsRequiredLint;
