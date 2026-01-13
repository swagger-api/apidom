import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const parametersTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_ITEM_FIELD_PARAMETERS_TYPE,
  source: 'apilint',
  message: '"parameters" must be of Parameters Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['parameters']],
  marker: 'key',
  target: 'parameters',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default parametersTypeLint;
