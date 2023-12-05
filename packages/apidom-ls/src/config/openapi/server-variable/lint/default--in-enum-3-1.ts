import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const defaultInEnum3_1Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_SERVER_VARIABLE_FIELD_DEFAULT_IN_ENUM,
  source: 'apilint',
  message: "'default' value must exist in the enum's values.",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintIncludedInArray',
  linterParams: ['parent.enum', false],
  marker: 'value',
  target: 'default',
  data: {},
  targetSpecs: OpenAPI31,
};

export default defaultInEnum3_1Lint;
