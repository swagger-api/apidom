import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30 } from '../../target-specs.ts';

const tagsItemsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPEN_API_FIELD_TAGS_ITEMS_TYPE,
  source: 'apilint',
  message: 'tags must be an array of Tag Objects',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['tag']],
  marker: 'key',
  target: 'tags',
  data: {},
  targetSpecs: OpenAPI30,
};

export default tagsItemsTypeLint;
