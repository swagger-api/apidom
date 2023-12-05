import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const getTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PATH_ITEM_FIELD_GET_TYPE,
  source: 'apilint',
  message: '"get" must be in a shape of the Operation Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation'],
  marker: 'value',
  target: 'get',
  data: {},
  targetSpecs: OpenAPI3,
};

export default getTypeLint;
