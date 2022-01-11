import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const parameterAllowedFieldsLint: LinterMeta = {
  code: ApilintCodes.ALL_NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [['description', 'schema', 'location', '$ref'], 'x-'],
  marker: 'key',
};

export default parameterAllowedFieldsLint;
