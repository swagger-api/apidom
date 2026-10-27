import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const anyOfTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_ANY_OF_TYPE,
  source: 'apilint',
  message: "'anyOf' must be a non-empty array of JSON Schemas",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['JSONSchema202012', 'boolean'], true],
  marker: 'key',
  markerTarget: 'anyOf',
  target: 'anyOf',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default anyOfTypeLint;
