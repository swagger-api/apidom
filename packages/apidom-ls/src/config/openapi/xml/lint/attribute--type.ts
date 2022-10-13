import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const attributeTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_XML_FIELD_ATTRIBUTE_TYPE,
  source: 'apilint',
  message: 'attribute must be a boolean',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'attribute',
  data: {},
};

export default attributeTypeLint;
