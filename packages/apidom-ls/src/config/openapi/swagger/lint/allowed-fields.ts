import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const allowedFieldsLint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'swagger',
      'info',
      'host',
      'basePath',
      'schemes',
      'consumes',
      'produces',
      'paths',
      'definitions',
      'parameters',
      'responses',
      'securityDefinitions',
      'security',
      'tags',
      'externalDocs',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: OpenAPI2,
};

export default allowedFieldsLint;
