import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const enumTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_ENUM_TYPE,
  source: 'apilint',
  message: "'enum' must be an array",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArray',
  marker: 'key',
  markerTarget: 'enum',
  target: 'enum',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default enumTypeLint;
