import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelPublishLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_PUBLISH,
  source: 'apilint',
  message: '"publish" must be an operation',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation'],
  marker: 'value',
  target: 'publish',
  data: {},
};

export default channelPublishLint;
