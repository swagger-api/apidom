import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const examplesMutuallyExclusiveLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_MEDIA_TYPE_FIELD_EXAMPLES_MUTUALLY_EXCLUSIVE,
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
  targetSpecs: OpenAPI3,
};

export default examplesMutuallyExclusiveLint;
