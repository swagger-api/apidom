import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFieldsLint2_4__2_6: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'messageId',
      'headers',
      'description',
      'summary',
      'tags',
      'externalDocs',
      'bindings',
      'correlationId',
      'schemaFormat',
      'contentType',
      'name',
      'title',
      'examples',
      '$ref',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: [
    { namespace: 'asyncapi', version: '2.4.0' },
    { namespace: 'asyncapi', version: '2.5.0' },
    { namespace: 'asyncapi', version: '2.6.0' },
  ],
};

export default allowedFieldsLint2_4__2_6;
