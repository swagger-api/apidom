import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const deleteTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PATH_ITEM_FIELD_DELETE_TYPE,
  source: 'apilint',
  message: '"delete" must be in a shape of the Operation Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['operation']],
  marker: 'value',
  target: 'delete',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default deleteTypeLint;
