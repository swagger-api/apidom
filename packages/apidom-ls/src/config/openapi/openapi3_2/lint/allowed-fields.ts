import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const allowedFieldsLint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'openapi',
      'info',
      'jsonSchemaDialect',
      '$self',
      'servers',
      'paths',
      'webhooks',
      'components',
      'security',
      'tags',
      'externalDocs',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: OpenAPI32,
};

export default allowedFieldsLint;
