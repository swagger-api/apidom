import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const maxMsgLengthTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_CHANNEL_BINDING_FIELD_MAX_MSG_LENGTH_TYPE,
  source: 'apilint',
  message: "'maxMsgLength' value must be a positive integer (zero included)",
  severity: 1,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'maxMsgLength',
  data: {},
};

export default maxMsgLengthTypeLint;
