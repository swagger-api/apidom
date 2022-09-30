import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const urlFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_O_SERVER_FIELD_URL_FORMAT_URI,
  source: 'apilint',
  message: 'url MUST be in the format of an URL.',
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'url',
  data: {},
  targetSpecs: [
    { namespace: 'openapi', version: '3.0.0' },
    { namespace: 'openapi', version: '3.0.1' },
    { namespace: 'openapi', version: '3.0.2' },
    { namespace: 'openapi', version: '3.0.3' },
    { namespace: 'openapi', version: '3.1.0' },
  ],
};

export default urlFormatURILint;
