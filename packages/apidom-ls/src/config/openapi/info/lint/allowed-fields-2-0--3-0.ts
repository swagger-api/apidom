import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFields2_0__3_0Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [['title', 'description', 'termsOfService', 'contact', 'license', 'version'], 'x-'],
  marker: 'key',
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default allowedFields2_0__3_0Lint;
