import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const targetHintsTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_LINK_DESCRIPTION_FIELD_TARGET_HINTS_TYPE,
  source: 'apilint',
  message: "'targetHints' should be an object",
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'targetHints',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default targetHintsTypeLint;
