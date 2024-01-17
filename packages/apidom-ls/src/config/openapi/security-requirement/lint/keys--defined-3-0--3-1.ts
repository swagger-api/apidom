import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const keysDefined3_0__3_1Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_SECURITY_REQUIREMENT_KEYS_DEFINED,
  source: 'apilint',
  message: 'security keys must be included in defined security schemes',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintKeysIncluded',
  linterParams: ['root.components.securitySchemes'],
  marker: 'key',
  data: {},
  targetSpecs: OpenAPI3,
};

export default keysDefined3_0__3_1Lint;
