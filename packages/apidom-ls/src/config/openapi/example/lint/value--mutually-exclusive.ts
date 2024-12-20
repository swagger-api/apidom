import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const valueMutuallyExclusiveLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_EXAMPLE_FIELD_VALUE_MUTUALLY_EXCLUSIVE,
  source: 'apilint',
  message: 'The value field and externalValue field are mutually exclusive.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'missingFields',
  linterParams: [['value']],
  marker: 'key',
  markerTarget: 'value',
  conditions: [
    {
      function: 'existFields',
      params: [['externalValue']],
    },
  ],
  targetSpecs: OpenAPI3,
};

export default valueMutuallyExclusiveLint;
