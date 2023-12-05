import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const $ref3_1AllowedSiblingsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_REFERENCE_FIELD_$REF_ALLOWED_SIBLINGS,
  source: 'apilint',
  message:
    'All other properties other then summary and description in a Reference Object are ignored',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'allowedFields',
  linterParams: [['$ref', 'summary', 'description']],
  marker: 'key',
  conditions: [
    {
      function: 'existFields',
      params: [['$ref']],
    },
  ],
  data: {},
  targetSpecs: OpenAPI31,
};

export default $ref3_1AllowedSiblingsLint;
