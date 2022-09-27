import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const heartBeatIntervalTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_SERVER_BINDING_FIELD_HEART_BEAT_INTERVAL_TYPE,
  source: 'apilint',
  message: "'heartBeatInterval' value must be a positive integer (zero included)",
  severity: 1,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'heartBeatInterval',
  data: {},
};

export default heartBeatIntervalTypeLint;
