import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI30 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const contentAllowedFields3_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_HEADER_FIELD_CONTENT_ALLOWED_FIELDS,
  source: 'apilint',
  message:
    'If "content" field is present, following fields are not allowed: style, explode, allowReserved, example and examples',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    ['description', 'required', 'deprecated', 'allowEmptyValue', 'schema', 'content', '$ref'],
    'x-',
  ],
  marker: 'key',
  conditions: [
    {
      function: 'existFields',
      params: [['content']],
    },
  ],
  targetSpecs: OpenAPI30,
};

export default contentAllowedFields3_0Lint;
