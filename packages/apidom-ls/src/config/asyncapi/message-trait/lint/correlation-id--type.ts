import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const correlationIdTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_TRAIT_FIELD_CORRELATION_ID_TYPE,
  source: 'apilint',
  message: "'correlationId' must be a Correlation ID",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['correlationID']],
  marker: 'value',
  target: 'correlationId',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default correlationIdTypeLint;
