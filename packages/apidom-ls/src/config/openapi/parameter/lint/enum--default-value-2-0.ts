import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const enumDefaultValue2_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_ENUM_DEFAULT_VALUE,
  source: 'apilint',
  message: 'Default values must be present in enum',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintContainsDefaultValue',
  marker: 'value',
  target: 'enum',
  data: {},
  targetSpecs: OpenAPI2,
};

export default enumDefaultValue2_0Lint;
