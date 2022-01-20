import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageCorrelationId: LinterMeta = {
  code: ApilintCodes.MESSAGE_CORRELATIONID,
  source: 'apilint',
  message: "'correlationId' must be a Correlation ID",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['correlationID'],
  marker: 'value',
  target: 'correlationId',
  data: {},
};

export default messageCorrelationId;
