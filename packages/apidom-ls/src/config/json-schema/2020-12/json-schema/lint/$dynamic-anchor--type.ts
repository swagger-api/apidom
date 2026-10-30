import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const $dynamicAnchorTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_$DYNAMIC_ANCHOR_TYPE,
  source: 'apilint',
  message: "'$dynamicAnchor' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: '$dynamicAnchor',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default $dynamicAnchorTypeLint;
