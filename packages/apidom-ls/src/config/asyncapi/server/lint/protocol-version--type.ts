import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const protocolVersionTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_FIELD_PROTOCOL_VERSION_TYPE,
  source: 'apilint',
  message: "'protocolVersion' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'protocolVersion',
  data: {},
};

export default protocolVersionTypeLint;
