import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const defaultInEnum3_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_O_SERVER_VARIABLE_FIELD_DEFAULT_IN_ENUM,
  source: 'apilint',
  message: "'default' value should exist in the enum's values.",
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintIncludedInArray',
  linterParams: ['parent.enum', false],
  marker: 'value',
  target: 'default',
  data: {},
  targetSpecs: [
    { namespace: 'openapi', version: '3.0.0' },
    { namespace: 'openapi', version: '3.0.1' },
    { namespace: 'openapi', version: '3.0.2' },
    { namespace: 'openapi', version: '3.0.3' },
  ],
};

export default defaultInEnum3_0Lint;
