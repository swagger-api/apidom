import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30 } from '../../../openapi/target-specs.ts';

const additionalItemsTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ADDITIONALITEMS,
  source: 'apilint',
  message: 'additionalItems must be a schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema']],
  marker: 'value',
  target: 'additionalItems',
  data: {},
  targetSpecs: OpenAPI30,
};

export default additionalItemsTypeLint;
