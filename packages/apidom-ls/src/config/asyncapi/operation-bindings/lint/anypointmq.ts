import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const anypointmqLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_ANYPOINTMQ,
  source: 'apilint',
  message: '"anypointmq" must be a Anypoint MQ Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['anypointmqOperationBinding'],
  marker: 'value',
  target: 'anypointmq',
  data: {},
};

export default anypointmqLint;
