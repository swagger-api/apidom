import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const keysUsedLint: LinterMeta = {
  code: ApilintCodes.SECURITY_SCHEME_USED,
  source: 'apilint',
  message:
    'Security Scheme was defined but never used. To apply security, use the `security` section in operations or on the root level of your API definition',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintSecuritySchemeUsed',
  marker: 'key',
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default keysUsedLint;
