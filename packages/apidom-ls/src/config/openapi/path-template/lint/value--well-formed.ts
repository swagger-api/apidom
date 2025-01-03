import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const valueWellFormedLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PATH_TEMPLATE_VALUE_WELL_FORMED,
  source: 'apilint',
  message: "'path' must begin with '/' and be relative to an individual endpoint",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintOpenAPIPathTemplateWellFormed',
  linterParams: [false],
  marker: 'value',
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default valueWellFormedLint;
