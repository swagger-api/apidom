import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const anypointmqLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_ANYPOINTMQ,
  source: 'apilint',
  message: '"anypointmq" must be a Anypoint MQ Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['anypointmqServerBinding'],
  marker: 'value',
  target: 'anypointmq',
  data: {},
};

export default anypointmqLint;
