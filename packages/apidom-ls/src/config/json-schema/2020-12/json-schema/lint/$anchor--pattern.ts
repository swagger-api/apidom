import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const $anchorPatternLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_$ANCHOR_PATTERN,
  source: 'apilint',
  message:
    "'$anchor' must start with a letter or underscore, followed by letters, digits, hyphens, underscores or periods",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^[A-Za-z_][-A-Za-z0-9._]*$'],
  marker: 'value',
  target: '$anchor',
  conditions: [
    {
      targets: [{ path: '$anchor' }],
      function: 'apilintType',
      params: ['string'],
    },
  ],
  data: {},
  targetSpecs: JSONSchema202012,
};

export default $anchorPatternLint;
