import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const keysPatternLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PATHS_KEYS_PATTERN,
  source: 'apilint',
  message: 'Paths Object keys must match the regular expression: `^(/|x-)`',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintKeysRegex',
  linterParams: ['^(/|x-)'],
  marker: 'key',
  data: {},
  targetSpecs: OpenAPI3,
};

export default keysPatternLint;
