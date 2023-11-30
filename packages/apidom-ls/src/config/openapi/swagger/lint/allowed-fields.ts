import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

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
  targetSpecs: [{ namespace: 'openapi', version: '2.0' }],
};

export default allowedFieldsLint;
