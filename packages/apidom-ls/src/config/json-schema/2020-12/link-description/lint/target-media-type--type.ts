import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const targetMediaTypeTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_LINK_DESCRIPTION_FIELD_TARGET_MEDIA_TYPE_TYPE,
  source: 'apilint',
  message: "'targetMediaType' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'targetMediaType',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default targetMediaTypeTypeLint;
