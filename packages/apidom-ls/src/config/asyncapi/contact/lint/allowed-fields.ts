import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const allowedFieldsLint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: 1,
  linterFunction: 'allowedFields',
  linterParams: [['name', 'url', 'email'], 'x-'],
  marker: 'key',
  targetSpecs: [
    { namespace: 'asyncapi', version: '2.0.0' },
    { namespace: 'asyncapi', version: '2.1.0' },
    { namespace: 'asyncapi', version: '2.2.0' },
    { namespace: 'asyncapi', version: '2.3.0' },
    { namespace: 'asyncapi', version: '2.4.0' },
  ],
};

export default allowedFieldsLint;
