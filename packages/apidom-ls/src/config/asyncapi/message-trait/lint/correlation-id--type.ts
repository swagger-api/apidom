import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const correlationIdTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_TRAIT_FIELD_CORRELATION_ID_TYPE,
  source: 'apilint',
  message: "'correlationId' must be a Correlation ID",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['correlationID'],
  marker: 'value',
  target: 'correlationId',
  data: {},
};

export default correlationIdTypeLint;
