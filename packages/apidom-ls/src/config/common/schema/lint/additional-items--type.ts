import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs';

const additionalItemsTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ADDITIONALITEMS,
  source: 'apilint',
  message: 'additionalItems must be a schema',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'additionalItems',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default additionalItemsTypeLint;
