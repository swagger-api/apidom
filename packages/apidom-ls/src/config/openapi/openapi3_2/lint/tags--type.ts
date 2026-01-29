import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const tagsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_OPEN_API_FIELD_TAGS_TYPE,
  source: 'apilint',
  message: "'tags' must be an array",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['array'],
  marker: 'value',
  target: 'tags',
  data: {},
  targetSpecs: OpenAPI32,
};

export default tagsTypeLint;
