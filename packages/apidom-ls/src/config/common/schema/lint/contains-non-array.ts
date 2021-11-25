import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaContainsNonArrayLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_CONTAINS_NONARRAY,
  source: 'apilint',
  message: 'contains has no effect on non arrays',
  severity: 2,
  linterFunction: 'missingField',
  linterParams: ['contains'],
  marker: 'key',
  markerTarget: 'contains',
  conditions: [
    {
      targets: [{ path: 'type' }],
      function: 'apilintContainsValue',
      negate: true,
      params: ['array'],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove contains',
        action: 'removeChild',
        functionParams: ['contains'],
        target: 'parent',
      },
    ],
  },
};

export default schemaContainsNonArrayLint;
