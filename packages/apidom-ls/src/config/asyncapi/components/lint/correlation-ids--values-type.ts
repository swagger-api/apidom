import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const correlationIDsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_CORRELATION_IDS_VALUES_TYPE,
  source: 'apilint',
  message: '"correlationIds" members must be Correlation ID Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['correlationID']],
  marker: 'key',
  markerTarget: 'correlationIds',
  target: 'correlationIds',
  data: {},
};

export default correlationIDsValuesTypeLint;
