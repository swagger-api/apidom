import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const correlationIdTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_FIELD_CORRELATION_ID_TYPE,
  source: 'apilint',
  message: "'correlationId' must be a Correlation ID",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['correlationID']],
  marker: 'value',
  target: 'correlationId',
  data: {},
};

export default correlationIdTypeLint;
