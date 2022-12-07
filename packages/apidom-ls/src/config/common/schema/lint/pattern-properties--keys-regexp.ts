import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const patternPropertiesKeysRegexpLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PATTERNPROPERTIES_KEY,
  source: 'apilint',
  message: 'patternProperties keys must be valid regex',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintKeyIsRegex',
  marker: 'key',
  target: 'patternProperties',
  markerTarget: 'patternProperties',
  data: {},
};

export default patternPropertiesKeysRegexpLint;
