import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const maxPropertiesTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_MAX_PROPERTIES_TYPE,
  source: 'apilint',
  message: "'maxProperties' must be a non-negative integer",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'maxProperties',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default maxPropertiesTypeLint;
