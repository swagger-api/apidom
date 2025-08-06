import { DiagnosticSeverity } from 'vscode-languageserver-types';

import { OpenAPI2 } from '../../target-specs.ts';
import ApilintCodes from '../../../codes.ts';

const inMultipleBody = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_IN_MULTIPLE_BODY,
  source: 'apilint',
  message: 'Multiple body parameters are not allowed',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintPropertyUniqueSiblingValue',
  linterParams: [['parameters'], 'in'],
  marker: 'key',
  markerTarget: 'in',
  target: 'in',
  conditions: [
    {
      targets: [{ path: 'in' }],
      function: 'apilintContainsValue',
      params: ['body'],
    },
  ],
  data: {},
  targetSpecs: OpenAPI2,
};

export default inMultipleBody;
