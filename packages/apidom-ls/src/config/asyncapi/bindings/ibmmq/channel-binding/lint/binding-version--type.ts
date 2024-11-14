import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../codes.ts';
import { LinterMeta } from '../../../../../../apidom-language-types.ts';

const bindingVersionTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_CHANNEL_BINDING_FIELD_BINDING_VERSION_TYPE,
  source: 'apilint',
  message: "'bindingVersion' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'bindingVersion',
  data: {},
};

export default bindingVersionTypeLint;
