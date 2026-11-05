import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const linksTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_LINKS_TYPE,
  source: 'apilint',
  message: "'links' must be an array of Link Description Objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['linkDescription']],
  marker: 'key',
  markerTarget: 'links',
  target: 'links',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default linksTypeLint;
