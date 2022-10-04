import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const descriptionTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_OPERATION_FIELD_DESCRIPTION_TYPE,
  source: 'apilint',
  message: 'description must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  data: {},
};

export default descriptionTypeLint;
