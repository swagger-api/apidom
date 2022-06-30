import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serversTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_ITEM_FIELD_SERVERS_TYPE,
  source: 'apilint',
  message: 'servers must be an array of strings',
  severity: 1,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'key',
  target: 'servers',
  data: {},
};

export default serversTypeLint;
