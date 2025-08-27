import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const enumTypeValue2_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_ENUM_TYPE_VALUE,
  source: 'apilint',
  message: 'enum value should conform to its parameters type',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['', false, true],
  marker: 'value',
  target: 'enum',
  data: {},
  targetSpecs: OpenAPI2,
};

export default enumTypeValue2_0Lint;
