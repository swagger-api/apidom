import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI } from '../../target-specs';

const valueWellFormedLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PATH_TEMPLATE_VALUE_WELL_FORMED,
  source: 'apilint',
  message: "'path' must begin with '/' and be relative to an individual endpoint",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintOpenAPIPathTemplateWellFormed',
  linterParams: [false],
  marker: 'value',
  targetSpecs: OpenAPI,
};

export default valueWellFormedLint;
