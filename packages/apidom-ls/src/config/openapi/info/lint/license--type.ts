import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const licenseTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_INFO_FIELD_LICENSE_TYPE,
  source: 'apilint',
  message: 'license must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['license']],
  marker: 'value',
  target: 'license',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default licenseTypeLint;
