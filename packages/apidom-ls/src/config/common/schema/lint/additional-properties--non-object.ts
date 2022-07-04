import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const additionalPropertiesNonObjectLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ADDITIONALPROPERTIES_NONOBJECT,
  source: 'apilint',
  message: 'additionalProperties has no effect on non objects',
  severity: 2,
  linterFunction: 'missingField',
  linterParams: ['additionalProperties'],
  marker: 'key',
  markerTarget: 'additionalProperties',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      negate: true,
      params: ['object'],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove additionalProperties',
        action: 'removeChild',
        functionParams: ['additionalProperties'],
        target: 'parent',
      },
    ],
  },
};

export default additionalPropertiesNonObjectLint;
