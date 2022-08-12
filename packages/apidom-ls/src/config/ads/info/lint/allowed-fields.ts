import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoAllowedFieldsLint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [['title', 'description'], 'x-'],
  marker: 'key',
};

export default infoAllowedFieldsLint;
