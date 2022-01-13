import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serversLint: LinterMeta = {
  code: ApilintCodes.SERVERS_SERVER_MEMBERS,
  source: 'apilint',
  message: 'servers members must be of type `server`',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: [['server']],
  marker: 'key',
  markerTarget: 'servers',
  target: 'servers',
  data: {},
};

export default serversLint;
