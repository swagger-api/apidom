import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const flowsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SECURITY_SCHEME_FIELD_FLOWS_TYPE,
  source: 'apilint',
  message: "'flows' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['oAuthFlows']],
  marker: 'value',
  target: 'flows',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default flowsTypeLint;
