import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const contentValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PARAMETER_FIELD_CONTENT_VALUES_TYPE,
  source: 'apilint',
  message: '"content" members must be Media Type Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['mediaType']],
  marker: 'key',
  markerTarget: 'content',
  target: 'content',
  data: {},
  targetSpecs: OpenAPI3,
};

export default contentValuesTypeLint;
