import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const keysPatternLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PARAMETERS_KEYS_PATTERN,
  source: 'apilint',
  message: 'Parameters Object keys must match the following field pattern: ^[A-Za-z0-9_\\-]+$',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintKeysRegex',
  linterParams: ['^[A-Za-z0-9_\\-]+$'],
  marker: 'key',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default keysPatternLint;
