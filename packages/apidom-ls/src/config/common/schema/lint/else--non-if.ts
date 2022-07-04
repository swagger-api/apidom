import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const elseNonIfLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ELSE_NONIF,
  source: 'apilint',
  message: '"else" has no effect without a "if"',
  severity: 2,
  linterFunction: 'missingField',
  linterParams: ['else'],
  marker: 'key',
  markerTarget: 'else',
  conditions: [
    {
      function: 'missingField',
      params: ['if'],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove else',
        action: 'removeChild',
        functionParams: ['else'],
        target: 'parent',
      },
    ],
  },
};

export default elseNonIfLint;
