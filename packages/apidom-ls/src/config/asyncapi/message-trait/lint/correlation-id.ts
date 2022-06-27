import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageTraitCorrelationId: LinterMeta = {
  code: ApilintCodes.MESSAGE_TRAIT_CORRELATIONID,
  source: 'apilint',
  message: "'correlationId' must be a Correlation ID",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['correlationID'],
  marker: 'value',
  target: 'correlationId',
  data: {},
};

export default messageTraitCorrelationId;
