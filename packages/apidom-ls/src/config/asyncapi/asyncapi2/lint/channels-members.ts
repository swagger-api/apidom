import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelsMembersLint: LinterMeta = {
  code: ApilintCodes.CHANNELS_CHANNEL_MEMBERS,
  source: 'apilint',
  message: 'channels members must be of type `channel`',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: ['channelItem'],
  marker: 'key',
  markerTarget: 'channels',
  target: 'channels',
  data: {},
};

export default channelsMembersLint;
