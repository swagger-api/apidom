import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const $vocabularyValuesTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_$VOCABULARY_VALUES_TYPE,
  source: 'apilint',
  message: "'$vocabulary' values must be booleans",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfType',
  linterParams: ['boolean'],
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

export default $vocabularyValuesTypeLint;
