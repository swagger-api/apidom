import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const $refNoSiblingsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PARAMETER_FIELD_$REF_NO_SIBLINGS,
  source: 'apilint',
  message: 'All other properties in a "$ref" object are ignored',
  severity: 2,
  linterFunction: 'allowedFields',
  linterParams: [['$ref']],
  marker: 'key',
  conditions: [
    {
      function: 'existFields',
      params: [['$ref']],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove $ref',
        action: 'removeChild',
        functionParams: ['$ref'],
        target: 'parent',
      },
    ],
  },
};

export default $refNoSiblingsLint;
