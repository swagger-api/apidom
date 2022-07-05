import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const heartBeatIntervalMaximumLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_SERVER_BINDING_FIELD_HEART_BEAT_INTERVAL_MAXIMUM,
  source: 'apilint',
  message: "'heartBeatInterval' value must be less then 999999",
  severity: 1,
  linterFunction: 'apilintMaximum',
  linterParams: [999999],
  marker: 'value',
  target: 'heartBeatInterval',
  data: {},
};

export default heartBeatIntervalMaximumLint;
