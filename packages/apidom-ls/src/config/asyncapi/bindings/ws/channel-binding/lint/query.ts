import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const webSocketChannelBindingQueryLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_WEBSOCKET_QUERY,
  source: 'apilint',
  message: 'query must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'query',
  data: {},
};

export default webSocketChannelBindingQueryLint;
