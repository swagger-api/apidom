import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const parameterRefNonSiblingsLint: LinterMeta = {
  code: ApilintCodes.PARAMETER_REF,
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

export default parameterRefNonSiblingsLint;
