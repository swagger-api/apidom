import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoAllowedFieldsLint: LinterMeta = {
  code: ApilintCodes.ALL_NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [
    ['title', 'summary', 'version', 'description', 'termsOfService', 'contact', 'license'],
    'x-',
  ],
  marker: 'key',
};

export default infoAllowedFieldsLint;
