import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFields3_1Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    ['type', 'description', 'name', 'in', 'scheme', 'bearerFormat', 'flows', 'openIdConnectUrl'],
    'x-',
  ],
  marker: 'key',
  conditions: [
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
  targetSpecs: OpenAPI31,
};

export default allowedFields3_1Lint;
