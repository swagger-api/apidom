import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const defaultMappingTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_DISCRIMINATOR_FIELD_DEFAULT_MAPPING_TYPE,
  source: 'apilint',
  message: "'defaultMapping' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'defaultMapping',
  data: {},
  targetSpecs: OpenAPI32,
};

export default defaultMappingTypeLint;
