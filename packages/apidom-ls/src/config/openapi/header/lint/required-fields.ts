import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const requiredFieldsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_HEADER_REQUIRED_FIELDS,
  source: 'apilint',
  message: 'Header Object must contain one of the following fields: content, schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['content'],
  marker: 'key',
  conditions: [
    {
      function: 'missingField',
      params: ['$ref'],
    },
    {
      function: 'missingFields',
      params: [['content', 'schema']],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'content' section",
        action: 'addChild',
        snippetYaml: 'content: \n  \n',
        snippetJson: '"content": {\n  \n  },\n',
      },
    ],
  },
  targetSpecs: OpenAPI3,
};

export default requiredFieldsLint;
