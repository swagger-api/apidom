import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const contactTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_INFO_FIELD_CONTACT_TYPE,
  source: 'apilint',
  message: 'contact must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['contact'],
  marker: 'value',
  target: 'contact',
  data: {},
};

export default contactTypeLint;
