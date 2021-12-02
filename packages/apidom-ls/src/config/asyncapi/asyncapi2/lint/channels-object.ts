import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelsObjectLint: LinterMeta = {
  code: ApilintCodes.CHANNELS_OBJECT,
  source: 'apilint',
  message: 'channels must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['channels'],
  marker: 'value',
  target: 'channels',
  data: {},
};

export default channelsObjectLint;
