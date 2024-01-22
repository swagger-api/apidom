import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../../openapi/target-specs';

const nullableNotRecommendedLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_NULLABLE_NOT_RECOMMENDED,
  source: 'apilint',
  message: 'nullable has no special meaning, if not set on purpose use `type="null"` instead',
  severity: DiagnosticSeverity.Hint,
  linterFunction: 'missingField',
  linterParams: ['nullable'],
  marker: 'key',
  markerTarget: 'nullable',
  data: {
    quickFix: [
      {
        message: 'remove nullable',
        action: 'removeChild',
        functionParams: ['nullable'],
        target: 'parent',
      },
    ],
  },
  targetSpecs: OpenAPI31,
};

export default nullableNotRecommendedLint;
