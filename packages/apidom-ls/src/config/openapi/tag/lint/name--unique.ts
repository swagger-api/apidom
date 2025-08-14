import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const nameUniqueLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_TAG_FIELD_UNIQUE_NAME_VALUE_TYPE,
  source: 'apilint',
  message: 'Tag Objects must have unique `name` field values.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintPropertyUniqueSiblingValue',
  linterParams: ['tags', 'name'],
  marker: 'value',
  target: 'name',
  markerTarget: 'name',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default nameUniqueLint;
