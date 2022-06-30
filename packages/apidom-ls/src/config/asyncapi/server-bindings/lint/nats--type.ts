import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const natsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_NATS_TYPE,
  source: 'apilint',
  message: '"nats" must be a NATS Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['natsServerBinding'],
  marker: 'value',
  target: 'nats',
  data: {},
};

export default natsTypeLint;
