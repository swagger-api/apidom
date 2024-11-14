import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const optionsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PATH_ITEM_FIELD_OPTIONS_TYPE,
  source: 'apilint',
  message: '"options" must be in a shape of the Operation Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['operation']],
  marker: 'value',
  target: 'options',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default optionsTypeLint;
