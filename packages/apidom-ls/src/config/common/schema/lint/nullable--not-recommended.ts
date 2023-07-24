import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const nullableNotRecommendedLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_NULLABLE_NOT_RECOMMENDED,
  source: 'apilint',
  message: 'nullable has no special meaning, if not set on purpose use `type="null"` instead',
  severity: DiagnosticSeverity.Hint,
  linterFunction: 'missingField',
  linterParams: ['nullable'],
  marker: 'key',
  markerTarget: 'nullable',
  targetSpecs: [
    { namespace: 'asyncapi', version: '2.0.0' },
    { namespace: 'asyncapi', version: '2.1.0' },
    { namespace: 'asyncapi', version: '2.2.0' },
    { namespace: 'asyncapi', version: '2.3.0' },
    { namespace: 'asyncapi', version: '2.4.0' },
    { namespace: 'asyncapi', version: '2.5.0' },
    { namespace: 'asyncapi', version: '2.6.0' },
    { namespace: 'openapi', version: '3.1.0' },
  ],
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
};

export default nullableNotRecommendedLint;
