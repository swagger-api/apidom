import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const hrefTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_LINK_DESCRIPTION_FIELD_HREF_TYPE,
  source: 'apilint',
  message: "'href' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'href',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default hrefTypeLint;
