import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

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
};

export default valueMutuallyExclusiveLint;
