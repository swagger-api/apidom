import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const inEquals2_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_IN_EQUALS,
  source: 'apilint',
  message: "'in' must be one of allowed values: query, header, path, formData, body",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['query', 'header', 'path', 'formData', 'body']],
  marker: 'value',
  target: 'in',
  data: {},
  targetSpecs: OpenAPI2,
};

export default inEquals2_0Lint;
