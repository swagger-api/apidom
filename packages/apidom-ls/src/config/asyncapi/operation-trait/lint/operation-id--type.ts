import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const operationIdTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_TRAIT_FIELD_OPERATION_ID_TYPE,
  source: 'apilint',
  message: "operationId' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'operationId',
  data: {},
};

export default operationIdTypeLint;
