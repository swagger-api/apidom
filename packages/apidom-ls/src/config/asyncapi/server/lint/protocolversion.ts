import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverProtocolVersionLint: LinterMeta = {
  code: ApilintCodes.SERVER_PROTOCOL_VERSION,
  source: 'apilint',
  message: "'protocolVersion' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'protocolVersion',
  data: {},
};

export default serverProtocolVersionLint;
