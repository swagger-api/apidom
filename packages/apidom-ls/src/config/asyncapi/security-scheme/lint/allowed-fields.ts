import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securitySchemeAllowedFieldsLint: LinterMeta = {
  code: ApilintCodes.ALL_NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [
    ['type', 'description', 'name', 'in', 'scheme', 'bearerFormat', 'flows', 'openIdConnectUrl'],
    'x-',
  ],
  marker: 'key',
};

export default securitySchemeAllowedFieldsLint;
