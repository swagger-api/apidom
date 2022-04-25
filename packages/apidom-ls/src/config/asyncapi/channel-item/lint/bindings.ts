import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelBindingsLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDINGS,
  source: 'apilint',
  message: 'bindings must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['channelBindings'],
  marker: 'key',
  markerTarget: 'bindings',
  target: 'bindings',
  data: {},
};

export default channelBindingsLint;
