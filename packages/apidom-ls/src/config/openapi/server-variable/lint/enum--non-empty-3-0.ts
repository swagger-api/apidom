import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const enumNonEmpty3_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_O_SERVER_VARIABLE_FIELD_ENUM_NON_EMPTY,
  source: 'apilint',
  message: "'enum' array should not be empty.",
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintArrayEmpty',
  linterParams: [],
  marker: 'key',
  target: 'enum',
  data: {},
  targetSpecs: [
    { namespace: 'openapi', version: '3.0.0' },
    { namespace: 'openapi', version: '3.0.1' },
    { namespace: 'openapi', version: '3.0.2' },
    { namespace: 'openapi', version: '3.0.3' },
  ],
};

export default enumNonEmpty3_0Lint;
