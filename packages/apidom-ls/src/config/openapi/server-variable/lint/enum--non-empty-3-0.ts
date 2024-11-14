import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const enumNonEmpty3_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_O_SERVER_VARIABLE_FIELD_ENUM_NON_EMPTY,
  source: 'apilint',
  message: "'enum' array should not be empty.",
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintArrayNotEmpty',
  linterParams: [],
  marker: 'key',
  target: 'enum',
  data: {},
  targetSpecs: OpenAPI30,
};

export default enumNonEmpty3_0Lint;
