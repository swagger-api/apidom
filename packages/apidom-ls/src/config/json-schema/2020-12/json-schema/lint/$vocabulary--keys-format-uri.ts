import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const $vocabularyKeysFormatURILint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_$VOCABULARY_KEYS_FORMAT_URI,
  source: 'apilint',
  message: "'$vocabulary' keys must be valid URIs",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintMembersKeysIsURI',
  marker: 'key',
  markerTarget: '$vocabulary',
  target: '$vocabulary',
  conditions: [
    {
      targets: [{ path: '$vocabulary' }],
      function: 'apilintType',
      params: ['object'],
    },
  ],
  data: {},
  targetSpecs: JSONSchema202012,
};

export default $vocabularyKeysFormatURILint;
