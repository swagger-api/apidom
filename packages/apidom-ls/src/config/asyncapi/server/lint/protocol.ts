import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverProtocolLint: LinterMeta = {
  code: ApilintCodes.SERVER_PROTOCOL,
  source: 'apilint',
  message: "'protocol' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'protocol',
  data: {},
};

export default serverProtocolLint;
