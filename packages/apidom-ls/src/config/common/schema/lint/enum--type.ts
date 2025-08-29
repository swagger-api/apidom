import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs.ts';

const enumTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ENUM_TYPE,
  source: 'apilint',
  message: "enum value should conform to its schema's type",
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['', false, true],
  marker: 'value',
  target: 'enum',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default enumTypeLint;
