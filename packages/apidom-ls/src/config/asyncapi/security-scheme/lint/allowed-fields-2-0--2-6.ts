import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFields2_0__2_6Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'type',
      'description',
      'name',
      'in',
      'scheme',
      'bearerFormat',
      'flows',
      'openIdConnectUrl',
      '$ref',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: AsyncAPI2,
};

export default allowedFields2_0__2_6Lint;
