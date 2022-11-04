import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const imbmqTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_IBMMQ_TYPE,
  source: 'apilint',
  message: '"ibmmq" must be a IBM MQ Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['ibmmqOperationBinding'],
  marker: 'value',
  target: 'ibmmq',
  data: {},
};

export default imbmqTypeLint;
