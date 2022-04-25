import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mercureLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_MERCURE,
  source: 'apilint',
  message: '"mercure" must be a Mercure Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mercureChannelBinding'],
  marker: 'value',
  target: 'mercure',
  data: {},
};

export default mercureLint;
