import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30 } from '../../target-specs.ts';

const componentsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPEN_API_FIELD_COMPONENTS_TYPE,
  source: 'apilint',
  message: 'components must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['components']],
  marker: 'value',
  target: 'components',
  data: {},
  targetSpecs: OpenAPI30,
};

export default componentsTypeLint;
