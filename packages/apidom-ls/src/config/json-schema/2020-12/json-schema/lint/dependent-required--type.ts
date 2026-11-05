import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const dependentRequiredTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_DEPENDENT_REQUIRED_TYPE,
  source: 'apilint',
  message: "'dependentRequired' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'dependentRequired',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default dependentRequiredTypeLint;
