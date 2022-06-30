import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const subscribeTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_ITEM_FIELD_SUBSCRIBE_TYPE,
  source: 'apilint',
  message: '"subscribe" must be an operation',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation'],
  marker: 'value',
  target: 'subscribe',
  data: {},
};

export default subscribeTypeLint;
