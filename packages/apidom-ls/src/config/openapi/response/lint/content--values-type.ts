import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const contentValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_RESPONSE_FIELD_CONTENT_VALUES_TYPE,
  source: 'apilint',
  message: '"content" members must be Media Type Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['mediaType']],
  marker: 'key',
  markerTarget: 'content',
  target: 'content',
  data: {},
};

export default contentValuesTypeLint;
