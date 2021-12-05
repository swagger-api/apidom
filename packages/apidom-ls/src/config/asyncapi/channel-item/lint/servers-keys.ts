import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serversKeysLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_SERVERS_KEYS,
  target: 'servers',
  source: 'apilint',
  message: 'server names must be included in defined servers',
  severity: 1,
  linterFunction: 'apilintElementKeysIncluded',
  linterParams: ['servers'],
  markerTarget: 'servers',
  marker: 'key',
  data: {},
};

export default serversKeysLint;
