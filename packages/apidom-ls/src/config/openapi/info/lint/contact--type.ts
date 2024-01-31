import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const contactTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_INFO_FIELD_CONTACT_TYPE,
  source: 'apilint',
  message: 'contact must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['contact']],
  marker: 'value',
  target: 'contact',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default contactTypeLint;
