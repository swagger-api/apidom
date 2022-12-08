import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const examplesMutuallyExclusiveLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PARAMETER_FIELD_EXAMPLES_MUTUALLY_EXCLUSIVE,
  source: 'apilint',
  message: 'The `example` field and `examples` field are mutually exclusive.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'missingFields',
  linterParams: [['examples']],
  marker: 'key',
  markerTarget: 'examples',
  conditions: [
    {
      function: 'existFields',
      params: [['example']],
    },
  ],
};

export default examplesMutuallyExclusiveLint;
