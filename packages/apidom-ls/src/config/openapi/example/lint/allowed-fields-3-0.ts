import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFields3_0Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [['summary', 'description', 'value', 'externalValue', '$ref'], 'x-'],
  marker: 'key',
  targetSpecs: OpenAPI30,
};

export default allowedFields3_0Lint;
