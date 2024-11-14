import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const allowedFieldsLint: LinterMeta = {
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
};

export default allowedFieldsLint;
