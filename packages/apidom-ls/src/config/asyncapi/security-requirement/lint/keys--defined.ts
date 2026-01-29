import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../target-specs.ts';

const keysDefinedLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SECURITY_REQUIREMENT_KEYS_DEFINED,
  source: 'apilint',
  message: 'security keys must be included in defined security schemes',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintKeysIncluded',
  linterParams: ['root.components.securitySchemes'],
  marker: 'key',
  data: {},
  targetSpecs: AsyncAPI2,
};

export default keysDefinedLint;
