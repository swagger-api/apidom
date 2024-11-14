import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const typeEquals2_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SECURITY_SCHEME_FIELD_TYPE_EQUALS,
  source: 'apilint',
  message: 'type must be one of allowed values: apiKey, http, oauth2, openIdConnect',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['basic', 'apiKey', 'oauth2']],
  marker: 'value',
  target: 'type',
  targetSpecs: OpenAPI2,
};

export default typeEquals2_0Lint;
