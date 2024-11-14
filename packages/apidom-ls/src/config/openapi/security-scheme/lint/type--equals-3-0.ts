import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const typeEquals3_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_SECURITY_SCHEME_FIELD_TYPE_EQUALS,
  source: 'apilint',
  message: 'type must be one of allowed values: apiKey, http, oauth2, openIdConnect',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['apiKey', 'http', 'oauth2', 'openIdConnect']],
  marker: 'value',
  target: 'type',
  targetSpecs: OpenAPI30,
};

export default typeEquals3_0Lint;
