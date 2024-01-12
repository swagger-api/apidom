import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const flowEqualsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SECURITY_SCHEME_FIELD_FLOW_EQUALS,
  source: 'apilint',
  message: "'flow' must be one of allowed values",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['implicit', 'password', 'application', 'accessCode']],
  marker: 'value',
  target: 'flow',
  data: {},
  targetSpecs: OpenAPI2,
};

export default flowEqualsLint;
