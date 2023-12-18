import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI } from '../../target-specs';

const descriptionTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_INFO_FIELD_DESCRIPTION_TYPE,
  source: 'apilint',
  message: 'description must be a string',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  data: {},
  targetSpecs: OpenAPI,
};

export default descriptionTypeLint;
