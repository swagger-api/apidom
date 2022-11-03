import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFields2_4__2_5Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      '$ref',
      'operationId',
      'summary',
      'description',
      'security',
      'tags',
      'externalDocs',
      'bindings',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: [
    { namespace: 'asyncapi', version: '2.4.0' },
    { namespace: 'asyncapi', version: '2.5.0' },
  ],
};

export default allowedFields2_4__2_5Lint;
