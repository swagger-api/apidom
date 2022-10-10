import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFieldsLint3_1: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'schemas',
      'responses',
      'parameters',
      'examples',
      'requestBodies',
      'headers',
      'securitySchemes',
      'links',
      'callbacks',
      'pathItems',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
};

export default allowedFieldsLint3_1;
