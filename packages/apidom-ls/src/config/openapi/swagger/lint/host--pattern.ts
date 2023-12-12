import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const hostPatternLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SWAGGER_FIELD_HOST_PATTERN,
  source: 'apilint',
  message:
    '"host" must be name or IP. Must not not include the scheme nor sub-paths and MAY include a port.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: [
    '^(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+(?:[A-Za-z]{2,6}|[A-Za-z]{2,4}\\.[A-Za-z]{2,4})|localhost|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}|::(?:[A-Fa-f0-9]{1,4}:){0,5}[A-Fa-f0-9]{1,4}|[A-Fa-f0-9]{1,4}::(?:[A-Fa-f0-9]{1,4}:){0,5}[A-Fa-f0-9]{1,4}|(?:[A-Fa-f0-9]{1,4}:){2}:?(?:[A-Fa-f0-9]{1,4}:){0,4}[A-Fa-f0-9]{1,4}|(?:[A-Fa-f0-9]{1,4}:){1,3}:?(?:[A-Fa-f0-9]{1,4}:){0,3}[A-Fa-f0-9]{1,4}|(?:[A-Fa-f0-9]{1,4}:){1,2}:?((?:[A-Fa-f0-9]{1,4}:){0,2}[A-Fa-f0-9]{1,4})|(?:::)(?:[A-Fa-f0-9]{1,4}:){1,7}[A-Fa-f0-9]{1,4})(?::[0-9]{1,5})?$',
  ],
  target: 'host',
  marker: 'value',
  data: {},
  targetSpecs: OpenAPI2,
};

export default hostPatternLint;
