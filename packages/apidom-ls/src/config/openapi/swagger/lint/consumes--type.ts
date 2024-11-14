import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const consumesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SWAGGER_FIELD_CONSUMES_TYPE,
  source: 'apilint',
  message: "'consumes' should be an array of strings",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'key',
  target: 'consumes',
  data: {},
  targetSpecs: OpenAPI2,
};

export default consumesTypeLint;
