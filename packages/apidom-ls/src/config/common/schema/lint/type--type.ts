import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs.ts';

const typeTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_TYPE,
  source: 'apilint',
  message: 'type must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'type',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default typeTypeLint;
