import channelComplete from './complete/channel';
import channelDocs from './docs/channel';
import { FormatMeta } from '../../../apidom-language-types';

const channelMeta: FormatMeta = {
  documentation: channelDocs,
  completion: channelComplete,
};

export default channelMeta;
