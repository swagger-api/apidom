import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const additionalOperationsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PATH_ITEM_FIELD_SERVERS_TYPE,
  source: 'apilint',
  message: '"additionalOperations" must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['object']],
  marker: 'value',
  target: 'additionalOperations',
  data: {},
  targetSpecs: OpenAPI32,
};

export default additionalOperationsTypeLint;
