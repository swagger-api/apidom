import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const mediaTypesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_COMPONENTS_FIELD_MEDIA_TYPES_TYPE,
  source: 'apilint',
  message: '"mediaTypes" members must be Media Type Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['mediaType']],
  marker: 'value',
  target: 'mediaTypes',
  data: {},
  targetSpecs: OpenAPI32,
};

export default mediaTypesTypeLint;
