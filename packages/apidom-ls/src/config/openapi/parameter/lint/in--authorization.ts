import { DiagnosticSeverity } from 'vscode-languageserver-types';

import { OpenAPI3 } from '../../target-specs.ts';
import ApilintCodes from '../../../codes.ts';

const inAuthorizationLint = {
  code: ApilintCodes.OPENAPI3_0_PARAMETER_FIELD_IN_AUTHORIZATION,
  source: 'apilint',
  message:
    'Header Parameter named "Authorization" is ignored. Use the "securitySchemes" and "security" sections instead to define authorization',
  severity: DiagnosticSeverity.Warning,
  linterParams: ['^(?!\\b(A|a)uthorization\\b).*$'],
  linterFunction: 'apilintValueRegex',
  marker: 'value',
  target: 'name',
  data: {},
  conditions: [
    {
      targets: [
        {
          path: 'in',
        },
      ],
      function: 'apilintContainsValue',
      params: ['header'],
    },
  ],
  targetSpecs: OpenAPI3,
};

export default inAuthorizationLint;
