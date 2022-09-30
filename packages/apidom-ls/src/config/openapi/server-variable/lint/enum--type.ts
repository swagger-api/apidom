import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const enumTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_O_SERVER_VARIABLE_FIELD_ENUM_TYPE,
  source: 'apilint',
  message: "'enum' must be an array of strings",
  severity: 1,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'key',
  target: 'enum',
  data: {},
};

export default enumTypeLint;
