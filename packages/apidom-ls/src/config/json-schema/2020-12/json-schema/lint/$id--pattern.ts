import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const $idPatternLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_$ID_PATTERN,
  source: 'apilint',
  message: "'$id' must not contain a non-empty fragment",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^[^#]*#?$'],
  marker: 'value',
  target: '$id',
  conditions: [
    {
      targets: [{ path: '$id' }],
      function: 'apilintType',
      params: ['string'],
    },
  ],
  data: {},
  targetSpecs: JSONSchema202012,
};

export default $idPatternLint;
