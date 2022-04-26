import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const contactAllowedFieldsLint: LinterMeta = {
  code: ApilintCodes.ALL_NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [['name', 'url', 'email'], 'x-'],
  marker: 'key',
};

export default contactAllowedFieldsLint;
