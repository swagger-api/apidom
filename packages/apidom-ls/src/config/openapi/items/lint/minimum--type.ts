import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const minimumTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_ITEMS_FIELD_MINIMUM_TYPE,
  source: 'apilint',
  message: 'minimum must be a number',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['number'],
  marker: 'value',
  target: 'minimum',
  data: {},
  targetSpecs: OpenAPI2,
};

export default minimumTypeLint;
