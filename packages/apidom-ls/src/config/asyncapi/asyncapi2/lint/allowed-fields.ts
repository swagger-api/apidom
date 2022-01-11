import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const asyncapi2AllowedFieldsLint: LinterMeta = {
  code: ApilintCodes.ALL_NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'asyncapi',
      'id',
      'info',
      'servers',
      'defaultContentType',
      'channels',
      'components',
      'tags',
      'externalDocs',
    ],
    'x-',
  ],
  marker: 'key',
};

export default asyncapi2AllowedFieldsLint;
