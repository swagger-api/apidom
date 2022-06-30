import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const enumTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_VARIABLE_FIELD_ENUM_TYPE,
  source: 'apilint',
  message: "enum' value must be an array of strings",
  severity: 1,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'value',
  target: 'enum',
  data: {},
};

export default enumTypeLint;
