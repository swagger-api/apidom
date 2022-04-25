import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const httpLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_HTTP,
  source: 'apilint',
  message: '"http" must be a HTTP Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['httpChannelBinding'],
  marker: 'value',
  target: 'http',
  data: {},
};

export default httpLint;
