import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const examplesTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_EXAMPLES_TYPE,
  source: 'apilint',
  message: "'examples' must be an array",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArray',
  marker: 'key',
  markerTarget: 'examples',
  target: 'examples',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default examplesTypeLint;
