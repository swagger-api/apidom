import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const keysPatternLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_KEYS_PATTERN,
  source: 'apilint',
  message: 'components keys must match the regular expression: `^[a-zA-Z0-9\\.\\-_]+$`',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintMembersKeysRegex',
  linterParams: ['^[a-zA-Z0-9\\.\\-_]+$'],
  marker: 'key',
  data: {},
  targetSpecs: OpenAPI3,
};

export default keysPatternLint;
