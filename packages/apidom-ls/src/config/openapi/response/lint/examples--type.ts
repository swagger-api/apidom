import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const examplesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_RESPONSE_FIELD_EXAMPLES_TYPE,
  source: 'apilint',
  message: '"examples" must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['example']],
  marker: 'key',
  markerTarget: 'examples',
  target: 'examples',
  data: {},
  targetSpecs: OpenAPI2,
};

export default examplesTypeLint;
