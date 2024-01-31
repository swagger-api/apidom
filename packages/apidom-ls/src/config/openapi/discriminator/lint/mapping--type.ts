import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const mappingTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_DISCRIMINATOR_FIELD_MAPPING_TYPE,
  source: 'apilint',
  message: "'mapping' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['discriminator-mapping']],
  marker: 'value',
  target: 'mapping',
  data: {},
  targetSpecs: OpenAPI3,
};

export default mappingTypeLint;
