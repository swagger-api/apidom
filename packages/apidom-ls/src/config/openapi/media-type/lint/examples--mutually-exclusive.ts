import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const examplesMutuallyExclusiveLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_MEDIA_TYPE_FIELD_EXAMPLES_MUTUALLY_EXCLUSIVE,
  source: 'apilint',
  message: 'The `example` field and `examples` field are mutually exclusive.',
  severity: 1,
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
