import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const oneOfTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_ONE_OF_TYPE,
  source: 'apilint',
  message: "'oneOf' must be a non-empty array of JSON Schemas",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['JSONSchema202012', 'boolean'], true],
  marker: 'key',
  markerTarget: 'oneOf',
  target: 'oneOf',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default oneOfTypeLint;
