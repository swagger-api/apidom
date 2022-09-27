import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const allowedFieldsLint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [
    ['openapi', 'info', 'servers', 'paths', 'components', 'security', 'tags', 'externalDocs'],
    'x-',
  ],
  marker: 'key',
};

export default allowedFieldsLint;
