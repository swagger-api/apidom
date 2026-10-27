import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const relTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_LINK_DESCRIPTION_FIELD_REL_TYPE,
  source: 'apilint',
  message: "'rel' must be a string or a non-empty array of strings",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['string', 'array']],
  marker: 'value',
  target: 'rel',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default relTypeLint;
