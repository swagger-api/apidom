import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const repliesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_COMPONENTS_FIELD_REPLIES_VALUES_TYPE,
  source: 'apilint',
  message: '"replies" members must be Operation Reply Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['operationReply']],
  marker: 'key',
  markerTarget: 'replies',
  target: 'replies',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default repliesValuesTypeLint;
