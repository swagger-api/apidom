import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const requiredFieldsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_OPEN_API_REQUIRED_FIELDS,
  source: 'apilint',
  message: 'OpenAPI Object must contain one of the following fields: paths, components, webhooks',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['paths'],
  marker: 'key',
  conditions: [
    {
      targets: [{ path: 'root' }],
      function: 'missingFields',
      params: [['paths', 'components', 'webhooks']],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'paths' section",
        action: 'addChild',
        snippetYaml: 'paths: \n  \n',
        snippetJson: '"paths": {\n  \n  },\n',
      },
    ],
  },
  targetSpecs: OpenAPI32,
};

export default requiredFieldsLint;
