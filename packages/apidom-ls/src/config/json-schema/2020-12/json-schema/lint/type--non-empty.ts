import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const typeNonEmptyLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_TYPE_NON_EMPTY,
  source: 'apilint',
  message: "'type' array must not be empty",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayNotEmpty',
  marker: 'value',
  target: 'type',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default typeNonEmptyLint;
