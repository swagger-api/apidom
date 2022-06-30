import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const natsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_NATS_TYPE,
  source: 'apilint',
  message: '"nats" must be a NATS Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['natsOperationBinding'],
  marker: 'value',
  target: 'nats',
  data: {},
};

export default natsTypeLint;
