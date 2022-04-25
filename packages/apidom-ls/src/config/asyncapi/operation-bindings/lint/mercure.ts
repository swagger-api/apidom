import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mercureLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_MERCURE,
  source: 'apilint',
  message: '"mercure" must be a Mercure Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mercureOperationBinding'],
  marker: 'value',
  target: 'mercure',
  data: {},
};

export default mercureLint;
