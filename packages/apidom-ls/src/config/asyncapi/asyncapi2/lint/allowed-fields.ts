import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../target-specs.ts';

const allowedFieldsLint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'asyncapi',
      'id',
      'info',
      'servers',
      'defaultContentType',
      'channels',
      'components',
      'tags',
      'externalDocs',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: AsyncAPI2,
};

export default allowedFieldsLint;
