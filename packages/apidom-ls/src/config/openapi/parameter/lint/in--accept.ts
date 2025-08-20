import { DiagnosticSeverity } from 'vscode-languageserver-types';

import { OpenAPI3 } from '../../target-specs.ts';
import ApilintCodes from '../../../codes.ts';

const inAcceptLint = {
  code: ApilintCodes.OPENAPI3_0_PARAMETER_FIELD_IN_CONTENT_TYPE,
  source: 'apilint',
  message:
    'Header Parameter named "Accept" is ignored. The values for the "Accept" header are defined by `requestBody.content.<media-type>`',
  severity: DiagnosticSeverity.Warning,
  linterParams: ['^(?!\\b(A|a)ccept\\b).*$'],
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

export default inAcceptLint;
