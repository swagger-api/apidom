import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const keysPatternLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVERS_KEYS_PATTERN,
  source: 'apilint',
  message: 'servers keys must match the following field pattern: ^[A-Za-z0-9_\\-]+$',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintKeysRegex',
  linterParams: ['^[A-Za-z0-9_\\-]+$'],
  marker: 'key',
  data: {},
};

export default keysPatternLint;
