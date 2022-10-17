import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const propertyNameTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_DISCRIMINATOR_FIELD_PROPERTY_NAME_TYPE,
  source: 'apilint',
  message: "'propertyName' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'propertyName',
  data: {},
};

export default propertyNameTypeLint;
