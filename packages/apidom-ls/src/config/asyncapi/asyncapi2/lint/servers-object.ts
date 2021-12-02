import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serversObjectLint: LinterMeta = {
  code: ApilintCodes.SERVERS_OBJECT,
  source: 'apilint',
  message: 'servers must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['servers'],
  marker: 'value',
  target: 'servers',
  data: {},
};

export default serversObjectLint;
