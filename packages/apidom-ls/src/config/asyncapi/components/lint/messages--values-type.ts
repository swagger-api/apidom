import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const messagesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_MESSAGES_VALUES_TYPE,
  source: 'apilint',
  message: '"messages" members must be Message object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['message']],
  marker: 'key',
  markerTarget: 'messages',
  target: 'messages',
  data: {},
};

export default messagesValuesTypeLint;
