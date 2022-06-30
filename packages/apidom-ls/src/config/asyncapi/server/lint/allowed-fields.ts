import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const allowedFieldsLint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'url',
      'protocol',
      'protocolVersion',
      'description',
      'variables',
      'security',
      'bindings',
      '$ref',
    ],
    'x-',
  ],
  marker: 'key',
};

export default allowedFieldsLint;
