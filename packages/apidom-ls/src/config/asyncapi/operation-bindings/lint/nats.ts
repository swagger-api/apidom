import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const natsLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_NATS,
  source: 'apilint',
  message: '"nats" must be a NATS Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['natsOperationBinding'],
  marker: 'value',
  target: 'nats',
  data: {},
};

export default natsLint;
