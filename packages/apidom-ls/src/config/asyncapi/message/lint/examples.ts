import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageExamplesLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_EXAMPLES,
  source: 'apilint',
  message: 'examples must be an array of Message Examples',
  severity: 1,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['object'],
  marker: 'key',
  target: 'examples',
  data: {},
};

export default messageExamplesLint;
