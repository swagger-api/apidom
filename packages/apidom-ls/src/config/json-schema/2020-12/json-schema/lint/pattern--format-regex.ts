import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const patternFormatRegexLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_PATTERN_FORMAT_REGEX,
  source: 'apilint',
  message: "'pattern' should be a valid regular expression",
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintValueIsRegex',
  marker: 'value',
  target: 'pattern',
  conditions: [
    {
      targets: [{ path: 'pattern' }],
      function: 'apilintType',
      params: ['string'],
    },
  ],
  data: {},
  targetSpecs: JSONSchema202012,
};

export default patternFormatRegexLint;
