import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI31 } from '../../target-specs.ts';

const webhooksLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_WEBHOOKS_VALUES_TYPE,
  source: 'apilint',
  message: '"webhooks" members must be Path Item Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['pathItem']],
  marker: 'key',
  markerTarget: 'webhooks',
  target: 'webhooks',
  data: {},
  targetSpecs: OpenAPI31,
};

export default webhooksLint;
