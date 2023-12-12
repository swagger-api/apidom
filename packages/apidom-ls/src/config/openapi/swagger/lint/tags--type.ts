import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const tagsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SWAGGER_FIELD_SECURITY_TYPE,
  source: 'apilint',
  message: '"tags" must be an array of Tag Objects',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['tag']],
  marker: 'value',
  target: 'tags',
  data: {},
  targetSpecs: OpenAPI2,
};

export default tagsTypeLint;
