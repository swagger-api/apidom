import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFields2_5__2_6Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    [
      'url',
      'protocol',
      'protocolVersion',
      'description',
      'variables',
      'security',
      'bindings',
      'tags',
      '$ref',
    ],
    'x-',
  ],
  marker: 'key',
  targetSpecs: [
    { namespace: 'asyncapi', version: '2.5.0' },
    { namespace: 'asyncapi', version: '2.6.0' },
  ],
};

export default allowedFields2_5__2_6Lint;
