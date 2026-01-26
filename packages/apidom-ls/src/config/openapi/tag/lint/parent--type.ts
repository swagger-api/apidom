import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const parentTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_TAG_FIELD_PARENT_TYPE,
  source: 'apilint',
  message: "'parent' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'parent',
  data: {},
  targetSpecs: OpenAPI32,
};

export default parentTypeLint;
