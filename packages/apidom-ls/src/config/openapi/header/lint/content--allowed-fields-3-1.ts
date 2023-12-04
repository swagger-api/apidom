import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const contentAllowedFields3_1Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_HEADER_FIELD_CONTENT_ALLOWED_FIELDS,
  source: 'apilint',
  message:
    'If "content" field is present, following fields are not allowed: style, explode, allowReserved, example and examples',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    ['description', 'required', 'deprecated', 'allowEmptyValue', 'schema', 'content'],
    'x-',
  ],
  marker: 'key',
  conditions: [
    {
      function: 'existFields',
      params: [['content']],
    },
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
  targetSpecs: OpenAPI31,
};

export default contentAllowedFields3_1Lint;
