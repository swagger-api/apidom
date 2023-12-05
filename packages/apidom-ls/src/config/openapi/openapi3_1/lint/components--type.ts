import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI31 } from '../../target-specs';

const componentsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_COMPONENTS_TYPE,
  source: 'apilint',
  message: 'components must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['components'],
  marker: 'value',
  target: 'components',
  data: {},
  targetSpecs: OpenAPI31,
};

export default componentsTypeLint;
