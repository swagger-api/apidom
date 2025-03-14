import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI31 } from '../../target-specs.ts';

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
      'servers',
      'paths',
      'components',
      'security',
      'tags',
      'externalDocs',
      'jsonSchemaDialect',
      'webhooks',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: OpenAPI31,
};

export default allowedFieldsLint;
