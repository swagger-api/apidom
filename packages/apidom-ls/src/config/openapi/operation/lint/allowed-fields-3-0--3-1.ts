import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFields3_0__3_1Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'tags',
      'summary',
      'description',
      'externalDocs',
      'operationId',
      'parameters',
      'requestBody',
      'responses',
      'callbacks',
      'deprecated',
      'security',
      'servers',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: OpenAPI3,
};

export default allowedFields3_0__3_1Lint;
