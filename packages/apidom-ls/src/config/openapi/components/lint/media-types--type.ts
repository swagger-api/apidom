import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const mediaTypesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_COMPONENTS_FIELD_MEDIA_TYPES_TYPE,
  source: 'apilint',
  message: 'mediaTypes must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['components-media-types']],
  marker: 'value',
  target: 'mediaTypes',
  data: {},
  targetSpecs: OpenAPI32,
};

export default mediaTypesTypeLint;
