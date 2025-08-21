import { DiagnosticSeverity } from 'vscode-languageserver-types';

import { OpenAPI30 } from '../../target-specs.ts';
import ApilintCodes from '../../../codes.ts';

const inContentTypeLint = {
  code: ApilintCodes.OPENAPI3_0_PARAMETER_FIELD_IN_CONTENT_TYPE,
  source: 'apilint',
  message:
    'Header Parameter named "Content-Type" is ignored. The values for the "Content-Type" header are defined by `requestBody.content.<media-type>`',
  severity: DiagnosticSeverity.Warning,
  linterParams: ['^(?!\\b(C|c)ontent-(T|t)ype\\b).*$'],
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
  targetSpecs: OpenAPI30,
};

export default inContentTypeLint;
