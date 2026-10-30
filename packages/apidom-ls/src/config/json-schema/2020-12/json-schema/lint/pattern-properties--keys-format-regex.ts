import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const patternPropertiesKeysFormatRegexLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_PATTERN_PROPERTIES_KEYS_FORMAT_REGEX,
  source: 'apilint',
  message: "'patternProperties' keys should be valid regular expressions",
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintMembersKeysIsRegex',
  marker: 'key',
  markerTarget: 'patternProperties',
  target: 'patternProperties',
  conditions: [
    {
      targets: [{ path: 'patternProperties' }],
      function: 'apilintType',
      params: ['object'],
    },
  ],
  data: {},
  targetSpecs: JSONSchema202012,
};

export default patternPropertiesKeysFormatRegexLint;
