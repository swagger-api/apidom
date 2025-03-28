import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const securityItemsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_TRAIT_FIELD_SECURITY_ITEMS_TYPE,
  source: 'apilint',
  message: 'security must be an array of Security Requirement Objects',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['securityRequirement']],
  marker: 'key',
  target: 'security',
  data: {},
};

export default securityItemsTypeLint;
