import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const anypointmqTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_ANYPOINTMQ_TYPE,
  source: 'apilint',
  message: '"anypointmq" must be a Anypoint MQ Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['anypointmqOperationBinding'],
  marker: 'value',
  target: 'anypointmq',
  data: {},
};

export default anypointmqTypeLint;
