import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SECURITY_DEFINITIONS_VALUES_TYPE,
  source: 'apilint',
  message: 'Security Definitions Object values must be of Security Scheme Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['securityScheme']],
  marker: 'key',
  data: {},
  targetSpecs: OpenAPI2,
};

export default valuesTypeLint;
