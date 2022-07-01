import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFieldsLint2_4: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'messageId',
      'headers',
      'description',
      'summary',
      'tags',
      'externalDocs',
      'bindings',
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
  targetSpecs: [{ namespace: 'asyncapi', version: '2.4.0' }],
};

export default allowedFieldsLint2_4;
