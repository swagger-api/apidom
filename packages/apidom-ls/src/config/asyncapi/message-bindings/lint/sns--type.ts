import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const snsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_SNS_TYPE,
  source: 'apilint',
  message: '"sns" must be a SNS Message Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['snsMessageBinding']],
  marker: 'value',
  target: 'sns',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default snsTypeLint;
