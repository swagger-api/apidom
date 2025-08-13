import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs.ts';

const enumDefaultValueLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ENUM_DEFAULT_VALUE,
  source: 'apilint',
  message: 'Default values must be present in enum',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintContainsDefaultValue',
  marker: 'value',
  target: 'enum',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default enumDefaultValueLint;
