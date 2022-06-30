import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mercureTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_MERCURE_TYPE,
  source: 'apilint',
  message: '"mercure" must be a Mercure Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mercureChannelBinding'],
  marker: 'value',
  target: 'mercure',
  data: {},
};

export default mercureTypeLint;
