import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../target-specs.ts';

const messageIdUniqueLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_TRAIT_FIELD_MESSAGE_ID_UNIQUE,
  source: 'apilint',
  message: "messageID' must be unique among all messages",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintPropertyUniqueValue',
  linterParams: [['message', 'messageTrait'], 'messageId', 'propertyValues'],
  marker: 'key',
  markerTarget: 'messageId',
  target: 'messageId',
  data: {},
  targetSpecs: AsyncAPI2,
};

export default messageIdUniqueLint;
