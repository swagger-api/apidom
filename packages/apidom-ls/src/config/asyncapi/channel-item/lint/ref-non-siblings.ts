import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelRefNonSiblingsLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_REF_NOSIBLINGS,
  source: 'apilint',
  message:
    "If there are conflicts between the referenced definition and this Channel Item's definition, the behavior is undefined",
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

export default channelRefNonSiblingsLint;
