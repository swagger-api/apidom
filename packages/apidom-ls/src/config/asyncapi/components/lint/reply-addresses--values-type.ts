import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const replyAddressesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_COMPONENTS_FIELD_REPLY_ADDRESSES_VALUES_TYPE,
  source: 'apilint',
  message: '"replyAddresses" members must be Operation Reply Address Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['operationReplyAddress', 'operation-reply-address']],
  marker: 'key',
  markerTarget: 'replyAddresses',
  target: 'replyAddresses',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default replyAddressesValuesTypeLint;
