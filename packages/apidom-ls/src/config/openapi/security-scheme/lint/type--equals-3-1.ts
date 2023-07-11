import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const typeEquals3_1Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_SECURITY_SCHEME_FIELD_TYPE_EQUALS,
  source: 'apilint',
  message: 'type must be one of allowed values: apiKey, http, mutualTLS, oauth2, openIdConnect',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['apiKey', 'http', 'mutualTLS', 'oauth2', 'openIdConnect']],
  marker: 'value',
  target: 'type',
  targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
};

export default typeEquals3_1Lint;
