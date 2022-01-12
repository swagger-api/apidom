import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mercureLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_MERCURE,
  source: 'apilint',
  message: '"mercure" must be a Mercure Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mercureServerBinding'],
  marker: 'value',
  target: 'mercure',
  data: {},
};

export default mercureLint;
