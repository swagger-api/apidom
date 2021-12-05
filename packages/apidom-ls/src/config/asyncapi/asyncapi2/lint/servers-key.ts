import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serversKeyLint: LinterMeta = {
  code: ApilintCodes.SERVERS_KEYS,
  source: 'apilint',
  message: 'servers keys must be valid regex',
  severity: 1,
  linterFunction: 'apilintKeyIsRegex',
  marker: 'key',
  target: 'servers',
  markerTarget: 'servers',
  data: {},
};

export default serversKeyLint;
