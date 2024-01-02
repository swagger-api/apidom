import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const schemaRequiredLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_SCHEMA_REQUIRED,
  source: 'apilint',
  message: "should have a 'schema' if `in` is 'body'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['schema'],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'in' }],
      function: 'apilintContainsValue',
      params: ['body'],
    },
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'schema' field",
        action: 'addChild',
        snippetYaml: 'schema: \n  \n',
        snippetJson: '"schema": {\n  \n  },\n',
      },
    ],
  },
  targetSpecs: OpenAPI2,
};

export default schemaRequiredLint;
