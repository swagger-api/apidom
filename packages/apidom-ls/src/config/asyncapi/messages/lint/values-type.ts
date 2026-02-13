import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_MESSAGES_VALUES_TYPE,
  source: 'apilint',
  message: 'Messages Object values must be of Message Object shape',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['message']],
  marker: 'key',
  markerTarget: 'messages',
  target: 'messages',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default valuesTypeLint;
