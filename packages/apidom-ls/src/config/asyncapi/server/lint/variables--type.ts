import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const variablesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_FIELD_VARIABLES_TYPE,
  source: 'apilint',
  message: 'variables must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['server-variables']],
  marker: 'value',
  target: 'variables',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default variablesTypeLint;
