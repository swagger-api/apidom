import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const writeOnlyTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_WRITE_ONLY_TYPE,
  source: 'apilint',
  message: "'writeOnly' must be a boolean",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'writeOnly',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default writeOnlyTypeLint;
