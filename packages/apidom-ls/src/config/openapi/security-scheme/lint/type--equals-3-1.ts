import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI31, OpenAPI32 } from '../../target-specs.ts';

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
  targetSpecs: [...OpenAPI31, ...OpenAPI32],
};

export default typeEquals3_1Lint;
