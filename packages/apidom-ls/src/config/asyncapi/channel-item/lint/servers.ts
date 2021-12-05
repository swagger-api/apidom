import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelServersLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_SERVERS,
  source: 'apilint',
  message: 'servers must be an array of strings',
  severity: 1,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'key',
  target: 'servers',
  data: {},
};

export default channelServersLint;
