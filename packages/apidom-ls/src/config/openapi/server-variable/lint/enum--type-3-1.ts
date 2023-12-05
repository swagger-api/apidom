import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const enumType3_1Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_SERVER_VARIABLE_FIELD_ENUM_TYPE,
  source: 'apilint',
  message: "'enum' must be a non-empty array of strings",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string', true],
  marker: 'key',
  target: 'enum',
  data: {},
  targetSpecs: OpenAPI31,
};

export default enumType3_1Lint;
