import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mercureLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_MERCURE,
  source: 'apilint',
  message: '"mercure" must be a Mercure Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mercureMessageBinding'],
  marker: 'value',
  target: 'mercure',
  data: {},
};

export default mercureLint;
