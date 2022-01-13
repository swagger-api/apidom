import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageBindingsRefNonSiblingsLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_REF_NOSIBLINGS,
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

export default messageBindingsRefNonSiblingsLint;
