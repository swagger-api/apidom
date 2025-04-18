import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const valueValidLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PATH_TEMPLATE_VALUE_VALID,
  source: 'apilint',
  message: 'path template expressions is not matched with Parameter Object(s)',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintOpenAPIPathTemplateValid',
  marker: 'value',
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
  conditions: [
    {
      function: 'apilintOpenAPIPathTemplateWellFormed',
      params: [true],
    },
  ],
};

export default valueValidLint;
