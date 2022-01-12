import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const natsLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_NATS,
  source: 'apilint',
  message: '"nats" must be a NATS Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['natsServerBinding'],
  marker: 'value',
  target: 'nats',
  data: {},
};

export default natsLint;
