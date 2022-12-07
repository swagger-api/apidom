import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const traitsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_FIELD_TRAITS_TYPE,
  source: 'apilint',
  message: "'traits' must be an array of Message Trait Objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['message-traits']],
  marker: 'key',
  target: 'traits',
  data: {},
};

export default traitsTypeLint;
