import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securityItemsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_TRAIT_FIELD_SECURITY_ITEMS_TYPE,
  source: 'apilint',
  message: 'security must be an array of Security Requirement Objects',
  severity: 1,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['securityRequirement']],
  marker: 'key',
  target: 'security',
  data: {},
};

export default securityItemsTypeLint;
