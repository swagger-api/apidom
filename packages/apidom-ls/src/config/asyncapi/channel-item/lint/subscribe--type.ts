import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../target-specs.ts';

const subscribeTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_ITEM_FIELD_SUBSCRIBE_TYPE,
  source: 'apilint',
  message: '"subscribe" must be an operation',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['operation']],
  marker: 'value',
  target: 'subscribe',
  data: {},
  targetSpecs: AsyncAPI2,
};

export default subscribeTypeLint;
