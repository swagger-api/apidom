import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const httpOperationBindingTypeLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_HTTP_TYPE,
  source: 'apilint',
  message: "'type' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'type',
  data: {},
};

export default httpOperationBindingTypeLint;
