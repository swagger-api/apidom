import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const serverTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_LINK_FIELD_SERVER_TYPE,
  source: 'apilint',
  message: 'server must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['server']],
  marker: 'value',
  target: 'server',
  data: {},
  targetSpecs: OpenAPI3,
};

export default serverTypeLint;
