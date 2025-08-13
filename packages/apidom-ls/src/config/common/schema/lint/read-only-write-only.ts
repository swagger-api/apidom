import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../../openapi/target-specs.ts';

const readOnlyWriteOnlyLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_READONLY_WRITEONLY,
  source: 'apilint',
  message: "A property MUST NOT be marked as both 'readOnly' and 'writeOnly' being true",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintKeysContainsValue',
  linterParams: [['readOnly', 'writeOnly'], true],
  marker: 'key',
  markerTarget: 'properties',
  data: {},
  targetSpecs: OpenAPI3,
};

export default readOnlyWriteOnlyLint;
