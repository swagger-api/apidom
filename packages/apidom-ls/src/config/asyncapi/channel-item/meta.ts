import channelComplete from './complete/channel-item';
import channelDocs from './docs/channel-item';
import channelLints from './lint/lints';
import { FormatMeta } from '../../../apidom-language-types';

const channelMeta: FormatMeta = {
  documentation: channelDocs,
  completion: channelComplete,
  lint: channelLints,
};

export default channelMeta;
