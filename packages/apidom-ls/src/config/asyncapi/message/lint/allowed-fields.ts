import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageAllowedFieldsLint: LinterMeta = {
  code: ApilintCodes.ALL_NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'headers',
      'description',
      'summary',
      'tags',
      'externalDocs',
      'bindings',
      'traits',
      'payload',
      'correlationId',
      'schemaFormat',
      'contentType',
      'name',
      'title',
      'examples',
      '$ref',
    ],
    'x-',
  ],
  marker: 'key',
};

export default messageAllowedFieldsLint;
