import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

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
      'operations',
      'components',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: AsyncAPI3,
};

export default allowedFieldsLint;
