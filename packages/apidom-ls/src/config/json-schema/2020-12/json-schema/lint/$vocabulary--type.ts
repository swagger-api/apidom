import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const $vocabularyTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_$VOCABULARY_TYPE,
  source: 'apilint',
  message: "'$vocabulary' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: '$vocabulary',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default $vocabularyTypeLint;
