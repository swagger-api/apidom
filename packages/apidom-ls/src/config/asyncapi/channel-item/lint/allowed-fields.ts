import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const channelAllowedFieldsLint: LinterMeta = {
  code: ApilintCodes.ALL_NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [
    ['$ref', 'description', 'servers', 'subscribe', 'publish', 'parameters', 'bindings'],
    'x-',
  ],
  marker: 'key',
};

export default channelAllowedFieldsLint;
