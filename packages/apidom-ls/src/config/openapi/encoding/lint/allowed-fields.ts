import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30, OpenAPI31, OpenAPI32 } from '../../target-specs.ts';

const allowedFields30Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [['contentType', 'headers', 'style', 'explode', 'allowReserved'], 'x-'],
  marker: 'key',
  targetSpecs: OpenAPI30,
};

const allowedFields31Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [['contentType', 'headers', 'style', 'explode', 'allowReserved'], 'x-'],
  marker: 'key',
  targetSpecs: OpenAPI31,
};

const allowedFields32Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'contentType',
      'headers',
      'style',
      'explode',
      'allowReserved',
      'encoding',
      'prefixEncoding',
      'itemEncoding',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: OpenAPI32,
};

const lints = [allowedFields30Lint, allowedFields31Lint, allowedFields32Lint];

export default lints;
