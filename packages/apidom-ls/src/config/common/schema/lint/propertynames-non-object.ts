import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaPropertyNamesNonObjectLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PROPERTYNAMES_NONOBJECT,
  source: 'apilint',
  message: 'propertyNames has no effect on non objects',
  severity: 2,
  linterFunction: 'missingField',
  linterParams: ['propertyNames'],
  marker: 'key',
  markerTarget: 'propertyNames',
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
        message: 'remove propertyNames',
        action: 'removeChild',
        functionParams: ['propertyNames'],
        target: 'parent',
      },
    ],
  },
};

export default schemaPropertyNamesNonObjectLint;
