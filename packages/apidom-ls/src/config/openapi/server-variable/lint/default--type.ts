import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const defaultTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_O_SERVER_VARIABLE_FIELD_DEFAULT_TYPE,
  source: 'apilint',
  message: "'default' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'default',
  data: {},
};

export default defaultTypeLint;
