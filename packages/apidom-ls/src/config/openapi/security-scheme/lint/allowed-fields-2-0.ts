import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const allowedFields2_0Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    ['type', 'description', 'name', 'in', 'flow', 'authorizationUrl', 'tokenUrl', 'scopes'],
    'x-',
  ],
  marker: 'key',
  targetSpecs: OpenAPI2,
};

export default allowedFields2_0Lint;
