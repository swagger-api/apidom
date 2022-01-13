import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const anypointmqLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_ANYPOINTMQ,
  source: 'apilint',
  message: '"anypointmq" must be a Anypoint MQ Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['anypointmqMessageBinding'],
  marker: 'value',
  target: 'anypointmq',
  data: {},
};

export default anypointmqLint;
