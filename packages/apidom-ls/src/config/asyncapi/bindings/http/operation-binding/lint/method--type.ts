import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const methodTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_HTTP_OPERATION_BINDING_FIELD_METHOD_TYPE,
  source: 'apilint',
  message: "'method' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'method',
  data: {},
};

export default methodTypeLint;
