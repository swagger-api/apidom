import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const keysDefined2_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SECURITY_REQUIREMENT_KEYS_DEFINED,
  source: 'apilint',
  message: 'security keys must be included in defined security schemes',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintKeysIncluded',
  linterParams: ['root.securityDefinitions'],
  marker: 'key',
  data: {},
  targetSpecs: OpenAPI2,
};

export default keysDefined2_0Lint;
