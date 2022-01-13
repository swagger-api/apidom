import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const natsLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_NATS,
  source: 'apilint',
  message: '"nats" must be a NATS Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['natsMessageBinding'],
  marker: 'value',
  target: 'nats',
  data: {},
};

export default natsLint;
