import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const keysDefinedLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_SECURITY_REQUIREMENT_KEYS_DEFINED,
  source: 'apilint',
  message: 'security keys must be included in defined security schemes',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintKeysIncluded',
  linterParams: ['root.components.securitySchemes'],
  marker: 'key',
  data: {},
  targetSpecs: OpenAPI3,
};

export default keysDefinedLint;
