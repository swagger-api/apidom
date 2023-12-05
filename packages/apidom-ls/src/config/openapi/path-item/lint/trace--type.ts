import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const traceTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PATH_ITEM_FIELD_TRACE_TYPE,
  source: 'apilint',
  message: '"trace" must be in a shape of the Operation Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation'],
  marker: 'value',
  target: 'trace',
  data: {},
  targetSpecs: OpenAPI3,
};

export default traceTypeLint;
