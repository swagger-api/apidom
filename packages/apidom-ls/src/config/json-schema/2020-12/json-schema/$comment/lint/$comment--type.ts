import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../codes.ts';
import { LinterMeta } from '../../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../../target-specs.ts';

const $commentTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_$COMMENT_TYPE,
  source: 'apilint',
  message: '$comment value must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$comment',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default $commentTypeLint;
