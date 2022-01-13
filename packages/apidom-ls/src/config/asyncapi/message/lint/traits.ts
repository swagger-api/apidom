import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageTraitsLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_TRAITS,
  source: 'apilint',
  message: 'traits must be an array of Message Trait',
  severity: 1,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['object'],
  marker: 'key',
  target: 'traits',
  data: {},
};

export default messageTraitsLint;
