import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const headersPropertiesLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_HTTP_HEADERS,
  source: 'apilint',
  message: '"headers" must have a `properties` key',
  severity: 1,
  linterFunction: 'hasRequiredField',
  linterParams: ['properties'],
  marker: 'value',
  target: 'headers',
  data: {},
};

export default headersPropertiesLint;
