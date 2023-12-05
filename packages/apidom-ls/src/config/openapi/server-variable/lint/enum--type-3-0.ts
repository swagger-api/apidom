import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI30 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const enumType3_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_O_SERVER_VARIABLE_FIELD_ENUM_TYPE,
  source: 'apilint',
  message: "'enum' should be an array of strings",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'key',
  target: 'enum',
  data: {},
  targetSpecs: OpenAPI30,
};

export default enumType3_0Lint;
